const corsOptions = {
  methods: ["GET", "POST", "PATCH", "DELETE"],
  origin: (origin, callback) => {
    callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
};

module.exports = corsOptions;
