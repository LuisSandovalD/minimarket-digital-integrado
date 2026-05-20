const cors =
  require("cors");

const helmet =
  require("helmet");

const morgan =
  require("morgan");

const cookieParser =
  require("cookie-parser");

const express =
  require("express");

module.exports = (app) => {

  // ========================================
  // CORS
  // ========================================
  app.use(

    cors({

      origin: [

        "http://localhost:5173",

        "https://minimarket-digital-integrado-294oiexip-luis-sandoval.vercel.app",

      ],

      credentials: true,

    })

  );

  // ========================================
  // SECURITY
  // ========================================

  app.use(helmet());

  // ========================================
  // COOKIES
  // ========================================

  app.use(cookieParser());

  // ========================================
  // BODY PARSER
  // ========================================

  app.use(

    express.json({

      limit: "10mb",

    })

  );

  app.use(

    express.urlencoded({

      extended: true,

      limit: "10mb",

    })

  );

  // ========================================
  // LOGS
  // ========================================

  app.use(
    morgan("dev")
  );

};