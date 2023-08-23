const db = require("../models/correctionModel");
const openai = require("../utils/openai");

const correctionsController = {
  postCorrection: async (req, res) => {
    console.log("SUCCESSSS");
    try {
      const { sentence } = req.body;
      console.log(sentence);
      const correctedResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "You will be provided with statements, and your task is to convert them to standard English."
          },
          {
            role: "user",
            content: `${sentence}`,
          },
        ],
        //  prompt: sentence,
        temperature: 0,
        max_tokens: 50, // Adjust as needed
      });
      console.log(correctedResponse);

      const correctedSentence = correctedResponse.choices[0].message.content;
      console.log(correctedSentence);

      await new Promise((resolve, reject) => {
        console.log('inside')
        db.run(
          "INSERT INTO corrections (original, corrected) VALUES (?, ?)",
          [sentence, correctedSentence],
          function (err) {
            if (err) {
              console.error("Database Error:", err.message);
              return reject(err);
            }

            console.log("Database INSERT Successful");
            resolve();
          }
        );
      });

      return res.json({ original: sentence, corrected: correctedSentence });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred." });
    }
  },

  getAllCorrections: async (req, res) => {
    try {
      db.all("SELECT original, corrected FROM corrections", [], (err, rows) => {
        if (err) {
          console.error("Database Error:", err.message);
          return res.status(500).json({ error: "Failed to retrieve correction pairs." });
        }

        const correctionPairs = rows.map((row) => ({
          original: row.original,
          corrected: row.corrected,
        }));

        return res.json(correctionPairs);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred." });
    }
  },


  getRandomCorrection: async (req, res) => {
    try {
      db.get("SELECT original, corrected FROM corrections ORDER BY RANDOM() LIMIT 1", [], (err, row) => {
        if (err) {
          console.error("Database Error:", err.message);
          return res.status(500).json({ error: "Failed to retrieve random correction." });
        }

        if (!row) {
          return res.status(404).json({ error: "No corrections found in the database." });
        }

        const correctionPair = {
          original: row.original,
          corrected: row.corrected,
        };

        return res.json(correctionPair);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred." });
    }
  },
  
};

module.exports = correctionsController;
