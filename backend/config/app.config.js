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
  // ALLOWED ORIGINS
  // ========================================

  const allowedOrigins = [

    // LOCAL FRONTEND
    "http://localhost:5173",

    // VERCEL PRODUCTION
    "https://minimarket-digital-integrado.vercel.app",

    // VERCEL PREVIEW
    "https://minimarket-digital-integrado-294oiexip-luis-sandoval.vercel.app",

  ];

  // ========================================
  // CORS
  // ========================================

  app.use(

    cors({

      origin: (origin, callback) => {

        // PERMITIR REQUESTS SIN ORIGIN
        // (POSTMAN, MOBILE APPS, ETC)
        if (!origin) {

          return callback(null, true);

        }

        // VALIDAR ORIGIN
        if (allowedOrigins.includes(origin)) {

          return callback(null, true);

        }

        return callback(

          new Error(
            `CORS bloqueado para origin: ${origin}`
          ),

          false

        );

      },

      credentials: true,

      methods: [

        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",

      ],

      allowedHeaders: [

        "Content-Type",
        "Authorization",

      ],

    })

  );

  // ========================================
  // SECURITY
  // ========================================

  app.use(

    helmet({

      crossOriginResourcePolicy: false,

    })

  );

  // ========================================
  // COOKIES
  // ========================================

  app.use(
    cookieParser()
  );

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