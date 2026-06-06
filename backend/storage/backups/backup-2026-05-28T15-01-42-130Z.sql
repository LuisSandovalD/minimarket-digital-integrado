--
-- PostgreSQL database dump
--

\restrict rmzSOb9bKmIVqDGvvSGGaRhRfMesSWNsBDB9DCVVLzXqRD2mlxuWsauA9qxAUoX

-- Dumped from database version 17.10 (6a49db4)
-- Dumped by pg_dump version 17.10

-- Started on 2026-05-28 10:01:42

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 49294)
-- Name: pg_session_jwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_session_jwt WITH SCHEMA public;


--
-- TOC entry 3940 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pg_session_jwt; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_session_jwt IS 'pg_session_jwt: manage authentication sessions using JWTs';


--
-- TOC entry 6 (class 2615 OID 49156)
-- Name: neon_auth; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA neon_auth;


--
-- TOC entry 9 (class 2615 OID 49302)
-- Name: pgrst; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA pgrst;


--
-- TOC entry 933 (class 1247 OID 17330)
-- Name: AuditAction; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."AuditAction" AS ENUM (
    'CREATE',
    'UPDATE',
    'DELETE',
    'SOFT_DELETE',
    'LOGIN',
    'LOGOUT',
    'EXPORT',
    'IMPORT',
    'RESTORE'
);


--
-- TOC entry 1008 (class 1247 OID 42414)
-- Name: MessageType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."MessageType" AS ENUM (
    'TEXT',
    'IMAGE',
    'FILE',
    'AUDIO',
    'VIDEO',
    'SYSTEM'
);


--
-- TOC entry 930 (class 1247 OID 17314)
-- Name: NotificationType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."NotificationType" AS ENUM (
    'EXPIRING_PRODUCT',
    'LOW_STOCK',
    'SYSTEM_ALERT',
    'PURCHASE_READY',
    'USER_ALERT',
    'INVENTORY_MISMATCH',
    'PAYMENT_OVERDUE'
);


--
-- TOC entry 918 (class 1247 OID 17260)
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentMethod" AS ENUM (
    'CASH',
    'CARD',
    'CHECK',
    'TRANSFER',
    'WALLET'
);


--
-- TOC entry 921 (class 1247 OID 17272)
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'FAILED',
    'CANCELLED',
    'REFUNDED',
    'PARTIAL'
);


--
-- TOC entry 927 (class 1247 OID 17300)
-- Name: PurchaseStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PurchaseStatus" AS ENUM (
    'DRAFT',
    'PENDING',
    'RECEIVED',
    'COMPLETED',
    'CANCELLED',
    'ARCHIVED'
);


--
-- TOC entry 915 (class 1247 OID 17249)
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'MANAGER',
    'SUPERVISOR',
    'EMPLOYEE',
    'VIEWER',
    'SUPPORT'
);


--
-- TOC entry 924 (class 1247 OID 17286)
-- Name: SaleStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SaleStatus" AS ENUM (
    'DRAFT',
    'PENDING',
    'COMPLETED',
    'CANCELLED',
    'RETURNED',
    'ARCHIVED'
);


--
-- TOC entry 1011 (class 1247 OID 42428)
-- Name: TicketPriority; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TicketPriority" AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'URGENT'
);


--
-- TOC entry 1014 (class 1247 OID 42446)
-- Name: TicketStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TicketStatus" AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'WAITING',
    'RESOLVED',
    'CLOSED'
);


--
-- TOC entry 936 (class 1247 OID 17374)
-- Name: UnitType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UnitType" AS ENUM (
    'LITER',
    'HALF_LITER',
    'QUARTER_LITER',
    'MILLILITER',
    'GRAM',
    'KILOGRAM',
    'UNIT',
    'BOX',
    'PACK',
    'DOZEN',
    'METER',
    'SQUARE_METER'
);


--
-- TOC entry 283 (class 1255 OID 49303)
-- Name: pre_config(); Type: FUNCTION; Schema: pgrst; Owner: -
--

CREATE FUNCTION pgrst.pre_config() RETURNS void
    LANGUAGE sql
    SET search_path TO ''
    AS $$
  SELECT
      set_config('pgrst.db_schemas', 'public', true)
    , set_config('pgrst.db_aggregates_enabled', 'true', true)
    , set_config('pgrst.db_anon_role', 'anonymous', true)
    , set_config('pgrst.jwt_role_claim_key', '.role', true)
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 270 (class 1259 OID 49185)
-- Name: account; Type: TABLE; Schema: neon_auth; Owner: -
--

CREATE TABLE neon_auth.account (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "accountId" text NOT NULL,
    "providerId" text NOT NULL,
    "userId" uuid NOT NULL,
    "accessToken" text,
    "refreshToken" text,
    "idToken" text,
    "accessTokenExpiresAt" timestamp with time zone,
    "refreshTokenExpiresAt" timestamp with time zone,
    scope text,
    password text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 275 (class 1259 OID 49245)
-- Name: invitation; Type: TABLE; Schema: neon_auth; Owner: -
--

CREATE TABLE neon_auth.invitation (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "organizationId" uuid NOT NULL,
    email text NOT NULL,
    role text,
    status text NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "inviterId" uuid NOT NULL
);


--
-- TOC entry 272 (class 1259 OID 49209)
-- Name: jwks; Type: TABLE; Schema: neon_auth; Owner: -
--

CREATE TABLE neon_auth.jwks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "publicKey" text NOT NULL,
    "privateKey" text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "expiresAt" timestamp with time zone
);


--
-- TOC entry 274 (class 1259 OID 49227)
-- Name: member; Type: TABLE; Schema: neon_auth; Owner: -
--

CREATE TABLE neon_auth.member (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "organizationId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    role text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 273 (class 1259 OID 49217)
-- Name: organization; Type: TABLE; Schema: neon_auth; Owner: -
--

CREATE TABLE neon_auth.organization (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    logo text,
    "createdAt" timestamp with time zone NOT NULL,
    metadata text
);


--
-- TOC entry 276 (class 1259 OID 49264)
-- Name: project_config; Type: TABLE; Schema: neon_auth; Owner: -
--

CREATE TABLE neon_auth.project_config (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    endpoint_id text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    trusted_origins jsonb NOT NULL,
    social_providers jsonb NOT NULL,
    email_provider jsonb,
    email_and_password jsonb,
    allow_localhost boolean NOT NULL,
    plugin_configs jsonb,
    webhook_config jsonb
);


--
-- TOC entry 269 (class 1259 OID 49169)
-- Name: session; Type: TABLE; Schema: neon_auth; Owner: -
--

CREATE TABLE neon_auth.session (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ipAddress" text,
    "userAgent" text,
    "userId" uuid NOT NULL,
    "impersonatedBy" text,
    "activeOrganizationId" text
);


--
-- TOC entry 268 (class 1259 OID 49157)
-- Name: user; Type: TABLE; Schema: neon_auth; Owner: -
--

CREATE TABLE neon_auth."user" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "emailVerified" boolean NOT NULL,
    image text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role text,
    banned boolean,
    "banReason" text,
    "banExpires" timestamp with time zone
);


--
-- TOC entry 271 (class 1259 OID 49199)
-- Name: verification; Type: TABLE; Schema: neon_auth; Owner: -
--

CREATE TABLE neon_auth.verification (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- TOC entry 259 (class 1259 OID 17604)
-- Name: AuditLog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AuditLog" (
    id integer NOT NULL,
    action public."AuditAction" NOT NULL,
    "entityType" character varying(100) NOT NULL,
    "entityId" integer NOT NULL,
    description character varying(500),
    "oldValues" jsonb,
    "newValues" jsonb,
    "ipAddress" character varying(50),
    "userAgent" character varying(500),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer,
    "branchId" integer,
    "companyId" integer NOT NULL
);


--
-- TOC entry 258 (class 1259 OID 17603)
-- Name: AuditLog_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."AuditLog_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3941 (class 0 OID 0)
-- Dependencies: 258
-- Name: AuditLog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."AuditLog_id_seq" OWNED BY public."AuditLog".id;


--
-- TOC entry 225 (class 1259 OID 17413)
-- Name: Branch; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Branch" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    code character varying(20),
    logo text,
    description text,
    address character varying(500) NOT NULL,
    phone character varying(20),
    email character varying(255),
    city character varying(100),
    state character varying(100),
    country character varying(100),
    "postalCode" character varying(20),
    "isActive" boolean DEFAULT true NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "companyId" integer NOT NULL
);


--
-- TOC entry 224 (class 1259 OID 17412)
-- Name: Branch_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Branch_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3942 (class 0 OID 0)
-- Dependencies: 224
-- Name: Branch_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Branch_id_seq" OWNED BY public."Branch".id;


--
-- TOC entry 233 (class 1259 OID 17461)
-- Name: Category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(500),
    "parentId" integer,
    "isActive" boolean DEFAULT true NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "companyId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


--
-- TOC entry 232 (class 1259 OID 17460)
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3943 (class 0 OID 0)
-- Dependencies: 232
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- TOC entry 223 (class 1259 OID 17400)
-- Name: Company; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Company" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(100) NOT NULL,
    ruc character varying(20),
    address character varying(500),
    phone character varying(20),
    email character varying(255),
    logo text,
    website character varying(255),
    "taxId" character varying(50),
    "legalRepresentative" character varying(255),
    "isActive" boolean DEFAULT true NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "subscriptionTier" character varying(50) DEFAULT 'FREE'::character varying NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


--
-- TOC entry 222 (class 1259 OID 17399)
-- Name: Company_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Company_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3944 (class 0 OID 0)
-- Dependencies: 222
-- Name: Company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Company_id_seq" OWNED BY public."Company".id;


--
-- TOC entry 265 (class 1259 OID 17636)
-- Name: Configuration; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Configuration" (
    id integer NOT NULL,
    "companyName" character varying(255),
    logo character varying(500),
    theme character varying(50) DEFAULT 'light'::character varying NOT NULL,
    language character varying(10) DEFAULT 'es'::character varying NOT NULL,
    "taxRate" numeric(5,2) DEFAULT 0 NOT NULL,
    currency character varying(10) DEFAULT 'PEN'::character varying NOT NULL,
    "defaultTaxEnabled" boolean DEFAULT true NOT NULL,
    "notifyLowStock" boolean DEFAULT true NOT NULL,
    "lowStockThreshold" integer DEFAULT 5 NOT NULL,
    "notifyExpiring" boolean DEFAULT true NOT NULL,
    "expiringDaysAlert" integer DEFAULT 30 NOT NULL,
    "requireTwoFactor" boolean DEFAULT false NOT NULL,
    "sessionTimeout" integer DEFAULT 3600 NOT NULL,
    "passwordMinLength" integer DEFAULT 8 NOT NULL,
    "passwordExpiresDays" integer,
    "requirePasswordChange" boolean DEFAULT false NOT NULL,
    "allowMultipleLogins" boolean DEFAULT true NOT NULL,
    "autoBackup" boolean DEFAULT true NOT NULL,
    "backupFrequency" character varying(50) DEFAULT 'DAILY'::character varying NOT NULL,
    "maxLoginAttempts" integer DEFAULT 5 NOT NULL,
    "allowExport" boolean DEFAULT true NOT NULL,
    "allowImport" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "companyId" integer NOT NULL
);


--
-- TOC entry 264 (class 1259 OID 17635)
-- Name: Configuration_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Configuration_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3945 (class 0 OID 0)
-- Dependencies: 264
-- Name: Configuration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Configuration_id_seq" OWNED BY public."Configuration".id;


--
-- TOC entry 237 (class 1259 OID 17488)
-- Name: Customer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Customer" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "documentType" character varying(20),
    "documentNumber" character varying(50),
    email character varying(255),
    phone character varying(20),
    address character varying(500),
    city character varying(100),
    notes text,
    "creditLimit" numeric(10,2),
    "currentDebt" numeric(10,2) DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "companyId" integer NOT NULL
);


--
-- TOC entry 236 (class 1259 OID 17487)
-- Name: Customer_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Customer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3946 (class 0 OID 0)
-- Dependencies: 236
-- Name: Customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Customer_id_seq" OWNED BY public."Customer".id;


--
-- TOC entry 267 (class 1259 OID 17957)
-- Name: EmployeeProfile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EmployeeProfile" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "position" text NOT NULL,
    department text NOT NULL,
    shift text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- TOC entry 266 (class 1259 OID 17956)
-- Name: EmployeeProfile_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."EmployeeProfile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3947 (class 0 OID 0)
-- Dependencies: 266
-- Name: EmployeeProfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."EmployeeProfile_id_seq" OWNED BY public."EmployeeProfile".id;


--
-- TOC entry 241 (class 1259 OID 17512)
-- Name: Inventory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Inventory" (
    id integer NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    "reservedStock" integer DEFAULT 0 NOT NULL,
    "damagedStock" integer DEFAULT 0 NOT NULL,
    "productId" integer NOT NULL,
    "branchId" integer NOT NULL,
    "companyId" integer NOT NULL,
    "lastUpdated" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- TOC entry 243 (class 1259 OID 17523)
-- Name: InventoryHistory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."InventoryHistory" (
    id integer NOT NULL,
    type character varying(50) NOT NULL,
    quantity integer NOT NULL,
    "previousStock" integer NOT NULL,
    "newStock" integer NOT NULL,
    reason character varying(255),
    reference character varying(100),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "productId" integer NOT NULL,
    "inventoryId" integer NOT NULL,
    "branchId" integer NOT NULL,
    "companyId" integer NOT NULL
);


--
-- TOC entry 242 (class 1259 OID 17522)
-- Name: InventoryHistory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."InventoryHistory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3948 (class 0 OID 0)
-- Dependencies: 242
-- Name: InventoryHistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."InventoryHistory_id_seq" OWNED BY public."InventoryHistory".id;


--
-- TOC entry 240 (class 1259 OID 17511)
-- Name: Inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Inventory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3949 (class 0 OID 0)
-- Dependencies: 240
-- Name: Inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Inventory_id_seq" OWNED BY public."Inventory".id;


--
-- TOC entry 257 (class 1259 OID 17593)
-- Name: Notification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Notification" (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    type public."NotificationType" NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "readAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL,
    "productId" integer,
    "companyId" integer NOT NULL
);


--
-- TOC entry 256 (class 1259 OID 17592)
-- Name: Notification_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Notification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3950 (class 0 OID 0)
-- Dependencies: 256
-- Name: Notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Notification_id_seq" OWNED BY public."Notification".id;


--
-- TOC entry 255 (class 1259 OID 17582)
-- Name: Payment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Payment" (
    id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    status public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    "paymentMethod" integer NOT NULL,
    reference character varying(100),
    notes character varying(500),
    "transactionId" character varying(100),
    "paidAt" timestamp(3) without time zone,
    "dueDate" timestamp(3) without time zone,
    "saleId" integer,
    "purchaseId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- TOC entry 245 (class 1259 OID 17531)
-- Name: PaymentMethod_DB; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PaymentMethod_DB" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    type public."PaymentMethod" NOT NULL,
    "accountNumber" character varying(50),
    "accountHolder" character varying(255),
    "isActive" boolean DEFAULT true NOT NULL,
    "companyId" integer NOT NULL
);


--
-- TOC entry 244 (class 1259 OID 17530)
-- Name: PaymentMethod_DB_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."PaymentMethod_DB_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3951 (class 0 OID 0)
-- Dependencies: 244
-- Name: PaymentMethod_DB_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."PaymentMethod_DB_id_seq" OWNED BY public."PaymentMethod_DB".id;


--
-- TOC entry 254 (class 1259 OID 17581)
-- Name: Payment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Payment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3952 (class 0 OID 0)
-- Dependencies: 254
-- Name: Payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Payment_id_seq" OWNED BY public."Payment".id;


--
-- TOC entry 235 (class 1259 OID 17473)
-- Name: Product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    sku character varying(50),
    barcode character varying(50),
    "purchasePrice" numeric(10,2) NOT NULL,
    "salePrice" numeric(10,2) NOT NULL,
    "costPrice" numeric(10,2) NOT NULL,
    "minStock" integer DEFAULT 5 NOT NULL,
    "maxStock" integer,
    "expirationDate" timestamp(3) without time zone,
    "batchNumber" character varying(100),
    "requiresExpiration" boolean DEFAULT false NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "companyId" integer NOT NULL,
    "categoryId" integer NOT NULL,
    "unitId" integer NOT NULL,
    "profitAmount" numeric(10,2) DEFAULT 0 NOT NULL,
    "profitMargin" numeric(10,2) DEFAULT 0 NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 17472)
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3953 (class 0 OID 0)
-- Dependencies: 234
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- TOC entry 251 (class 1259 OID 17561)
-- Name: Purchase; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Purchase" (
    id integer NOT NULL,
    "purchaseNumber" character varying(50) NOT NULL,
    total numeric(10,2) NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    tax numeric(10,2) DEFAULT 0 NOT NULL,
    discount numeric(10,2) DEFAULT 0 NOT NULL,
    status public."PurchaseStatus" DEFAULT 'COMPLETED'::public."PurchaseStatus" NOT NULL,
    notes character varying(500),
    "expectedDelivery" timestamp(3) without time zone,
    "actualDelivery" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "buyerId" integer NOT NULL,
    "branchId" integer NOT NULL,
    "companyId" integer NOT NULL,
    "supplierId" integer
);


--
-- TOC entry 253 (class 1259 OID 17574)
-- Name: PurchaseDetail; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PurchaseDetail" (
    id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    tax numeric(10,2) DEFAULT 0 NOT NULL,
    "purchaseId" integer NOT NULL,
    "productId" integer NOT NULL
);


--
-- TOC entry 252 (class 1259 OID 17573)
-- Name: PurchaseDetail_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."PurchaseDetail_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3954 (class 0 OID 0)
-- Dependencies: 252
-- Name: PurchaseDetail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."PurchaseDetail_id_seq" OWNED BY public."PurchaseDetail".id;


--
-- TOC entry 250 (class 1259 OID 17560)
-- Name: Purchase_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Purchase_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3955 (class 0 OID 0)
-- Dependencies: 250
-- Name: Purchase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Purchase_id_seq" OWNED BY public."Purchase".id;


--
-- TOC entry 247 (class 1259 OID 17539)
-- Name: Sale; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Sale" (
    id integer NOT NULL,
    "saleNumber" character varying(50) NOT NULL,
    total numeric(10,2) NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    tax numeric(10,2) DEFAULT 0 NOT NULL,
    discount numeric(10,2) DEFAULT 0 NOT NULL,
    status public."SaleStatus" DEFAULT 'COMPLETED'::public."SaleStatus" NOT NULL,
    notes character varying(500),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "sellerId" integer NOT NULL,
    "branchId" integer NOT NULL,
    "companyId" integer NOT NULL,
    "customerId" integer
);


--
-- TOC entry 249 (class 1259 OID 17552)
-- Name: SaleDetail; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SaleDetail" (
    id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    discount numeric(10,2) DEFAULT 0 NOT NULL,
    tax numeric(10,2) DEFAULT 0 NOT NULL,
    "saleId" integer NOT NULL,
    "productId" integer NOT NULL
);


--
-- TOC entry 248 (class 1259 OID 17551)
-- Name: SaleDetail_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."SaleDetail_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3956 (class 0 OID 0)
-- Dependencies: 248
-- Name: SaleDetail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."SaleDetail_id_seq" OWNED BY public."SaleDetail".id;


--
-- TOC entry 246 (class 1259 OID 17538)
-- Name: Sale_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Sale_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3957 (class 0 OID 0)
-- Dependencies: 246
-- Name: Sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Sale_id_seq" OWNED BY public."Sale".id;


--
-- TOC entry 239 (class 1259 OID 17500)
-- Name: Supplier; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Supplier" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    ruc character varying(50),
    email character varying(255),
    phone character varying(20),
    address character varying(500),
    "contactPerson" character varying(255),
    website character varying(255),
    notes text,
    "currentDebt" numeric(10,2) DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "companyId" integer NOT NULL
);


--
-- TOC entry 238 (class 1259 OID 17499)
-- Name: Supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Supplier_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3958 (class 0 OID 0)
-- Dependencies: 238
-- Name: Supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Supplier_id_seq" OWNED BY public."Supplier".id;


--
-- TOC entry 261 (class 1259 OID 17614)
-- Name: SupportTicket; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SupportTicket" (
    id integer NOT NULL,
    "ticketNumber" character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    status public."TicketStatus" DEFAULT 'OPEN'::public."TicketStatus" NOT NULL,
    priority public."TicketPriority" DEFAULT 'MEDIUM'::public."TicketPriority" NOT NULL,
    "resolutionNotes" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "resolvedAt" timestamp(3) without time zone,
    "userId" integer NOT NULL,
    "assignedTo" integer,
    "companyId" integer NOT NULL,
    "closedAt" timestamp(3) without time zone,
    "deletedAt" timestamp(3) without time zone,
    "isTyping" boolean DEFAULT false NOT NULL,
    "lastMessage" text,
    "lastMessageAt" timestamp(3) without time zone,
    "unreadCount" integer DEFAULT 0 NOT NULL,
    attachments jsonb
);


--
-- TOC entry 260 (class 1259 OID 17613)
-- Name: SupportTicket_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."SupportTicket_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3959 (class 0 OID 0)
-- Dependencies: 260
-- Name: SupportTicket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."SupportTicket_id_seq" OWNED BY public."SupportTicket".id;


--
-- TOC entry 263 (class 1259 OID 17626)
-- Name: TicketComment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TicketComment" (
    id integer NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "ticketId" integer NOT NULL,
    "userId" integer NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "editedAt" timestamp(3) without time zone,
    "isEdited" boolean DEFAULT false NOT NULL,
    "isInternal" boolean DEFAULT false NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "messageType" public."MessageType" DEFAULT 'TEXT'::public."MessageType" NOT NULL,
    "readAt" timestamp(3) without time zone,
    attachments jsonb
);


--
-- TOC entry 262 (class 1259 OID 17625)
-- Name: TicketComment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."TicketComment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3960 (class 0 OID 0)
-- Dependencies: 262
-- Name: TicketComment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."TicketComment_id_seq" OWNED BY public."TicketComment".id;


--
-- TOC entry 231 (class 1259 OID 17452)
-- Name: Unit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Unit" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    abbreviation character varying(20) NOT NULL,
    type public."UnitType" NOT NULL,
    "conversionFactor" numeric(10,4) DEFAULT 1 NOT NULL,
    "baseUnit" integer,
    "isActive" boolean DEFAULT true NOT NULL,
    "companyId" integer NOT NULL
);


--
-- TOC entry 230 (class 1259 OID 17451)
-- Name: Unit_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Unit_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3961 (class 0 OID 0)
-- Dependencies: 230
-- Name: Unit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Unit_id_seq" OWNED BY public."Unit".id;


--
-- TOC entry 227 (class 1259 OID 17425)
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public."Role" DEFAULT 'EMPLOYEE'::public."Role" NOT NULL,
    phone character varying(20),
    avatar text,
    "isActive" boolean DEFAULT true NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "isOnline" boolean DEFAULT false NOT NULL,
    "lastLogin" timestamp(3) without time zone,
    "lastLogout" timestamp(3) without time zone,
    "loginAttempts" integer DEFAULT 0 NOT NULL,
    "lockedUntil" timestamp(3) without time zone,
    "twoFactorEnabled" boolean DEFAULT false NOT NULL,
    "twoFactorSecret" character varying(255),
    "backupCodes" text,
    "managerId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "companyId" integer NOT NULL,
    "branchId" integer
);


--
-- TOC entry 229 (class 1259 OID 17441)
-- Name: UserSession; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UserSession" (
    id integer NOT NULL,
    token text NOT NULL,
    "refreshToken" text NOT NULL,
    "ipAddress" character varying(100),
    "userAgent" character varying(500),
    "isActive" boolean DEFAULT true NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "refreshExpiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" integer NOT NULL
);


--
-- TOC entry 228 (class 1259 OID 17440)
-- Name: UserSession_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."UserSession_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3962 (class 0 OID 0)
-- Dependencies: 228
-- Name: UserSession_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."UserSession_id_seq" OWNED BY public."UserSession".id;


--
-- TOC entry 226 (class 1259 OID 17424)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3963 (class 0 OID 0)
-- Dependencies: 226
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 221 (class 1259 OID 17239)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 3480 (class 2604 OID 17607)
-- Name: AuditLog id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AuditLog" ALTER COLUMN id SET DEFAULT nextval('public."AuditLog_id_seq"'::regclass);


--
-- TOC entry 3411 (class 2604 OID 17416)
-- Name: Branch id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Branch" ALTER COLUMN id SET DEFAULT nextval('public."Branch_id_seq"'::regclass);


--
-- TOC entry 3429 (class 2604 OID 17464)
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- TOC entry 3406 (class 2604 OID 17403)
-- Name: Company id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Company" ALTER COLUMN id SET DEFAULT nextval('public."Company_id_seq"'::regclass);


--
-- TOC entry 3494 (class 2604 OID 17639)
-- Name: Configuration id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Configuration" ALTER COLUMN id SET DEFAULT nextval('public."Configuration_id_seq"'::regclass);


--
-- TOC entry 3442 (class 2604 OID 17491)
-- Name: Customer id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Customer" ALTER COLUMN id SET DEFAULT nextval('public."Customer_id_seq"'::regclass);


--
-- TOC entry 3515 (class 2604 OID 17960)
-- Name: EmployeeProfile id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EmployeeProfile" ALTER COLUMN id SET DEFAULT nextval('public."EmployeeProfile_id_seq"'::regclass);


--
-- TOC entry 3450 (class 2604 OID 17515)
-- Name: Inventory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Inventory" ALTER COLUMN id SET DEFAULT nextval('public."Inventory_id_seq"'::regclass);


--
-- TOC entry 3455 (class 2604 OID 17526)
-- Name: InventoryHistory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."InventoryHistory" ALTER COLUMN id SET DEFAULT nextval('public."InventoryHistory_id_seq"'::regclass);


--
-- TOC entry 3477 (class 2604 OID 17596)
-- Name: Notification id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification" ALTER COLUMN id SET DEFAULT nextval('public."Notification_id_seq"'::regclass);


--
-- TOC entry 3474 (class 2604 OID 17585)
-- Name: Payment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment" ALTER COLUMN id SET DEFAULT nextval('public."Payment_id_seq"'::regclass);


--
-- TOC entry 3457 (class 2604 OID 17534)
-- Name: PaymentMethod_DB id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PaymentMethod_DB" ALTER COLUMN id SET DEFAULT nextval('public."PaymentMethod_DB_id_seq"'::regclass);


--
-- TOC entry 3433 (class 2604 OID 17476)
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- TOC entry 3467 (class 2604 OID 17564)
-- Name: Purchase id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Purchase" ALTER COLUMN id SET DEFAULT nextval('public."Purchase_id_seq"'::regclass);


--
-- TOC entry 3472 (class 2604 OID 17577)
-- Name: PurchaseDetail id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PurchaseDetail" ALTER COLUMN id SET DEFAULT nextval('public."PurchaseDetail_id_seq"'::regclass);


--
-- TOC entry 3459 (class 2604 OID 17542)
-- Name: Sale id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Sale" ALTER COLUMN id SET DEFAULT nextval('public."Sale_id_seq"'::regclass);


--
-- TOC entry 3464 (class 2604 OID 17555)
-- Name: SaleDetail id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SaleDetail" ALTER COLUMN id SET DEFAULT nextval('public."SaleDetail_id_seq"'::regclass);


--
-- TOC entry 3446 (class 2604 OID 17503)
-- Name: Supplier id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Supplier" ALTER COLUMN id SET DEFAULT nextval('public."Supplier_id_seq"'::regclass);


--
-- TOC entry 3482 (class 2604 OID 17617)
-- Name: SupportTicket id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SupportTicket" ALTER COLUMN id SET DEFAULT nextval('public."SupportTicket_id_seq"'::regclass);


--
-- TOC entry 3488 (class 2604 OID 17629)
-- Name: TicketComment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TicketComment" ALTER COLUMN id SET DEFAULT nextval('public."TicketComment_id_seq"'::regclass);


--
-- TOC entry 3426 (class 2604 OID 17455)
-- Name: Unit id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Unit" ALTER COLUMN id SET DEFAULT nextval('public."Unit_id_seq"'::regclass);


--
-- TOC entry 3415 (class 2604 OID 17428)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 3423 (class 2604 OID 17444)
-- Name: UserSession id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserSession" ALTER COLUMN id SET DEFAULT nextval('public."UserSession_id_seq"'::regclass);


--
-- TOC entry 3928 (class 0 OID 49185)
-- Dependencies: 270
-- Data for Name: account; Type: TABLE DATA; Schema: neon_auth; Owner: -
--

COPY neon_auth.account (id, "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", scope, password, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3933 (class 0 OID 49245)
-- Dependencies: 275
-- Data for Name: invitation; Type: TABLE DATA; Schema: neon_auth; Owner: -
--

COPY neon_auth.invitation (id, "organizationId", email, role, status, "expiresAt", "createdAt", "inviterId") FROM stdin;
\.


--
-- TOC entry 3930 (class 0 OID 49209)
-- Dependencies: 272
-- Data for Name: jwks; Type: TABLE DATA; Schema: neon_auth; Owner: -
--

COPY neon_auth.jwks (id, "publicKey", "privateKey", "createdAt", "expiresAt") FROM stdin;
\.


--
-- TOC entry 3932 (class 0 OID 49227)
-- Dependencies: 274
-- Data for Name: member; Type: TABLE DATA; Schema: neon_auth; Owner: -
--

COPY neon_auth.member (id, "organizationId", "userId", role, "createdAt") FROM stdin;
\.


--
-- TOC entry 3931 (class 0 OID 49217)
-- Dependencies: 273
-- Data for Name: organization; Type: TABLE DATA; Schema: neon_auth; Owner: -
--

COPY neon_auth.organization (id, name, slug, logo, "createdAt", metadata) FROM stdin;
\.


--
-- TOC entry 3934 (class 0 OID 49264)
-- Dependencies: 276
-- Data for Name: project_config; Type: TABLE DATA; Schema: neon_auth; Owner: -
--

COPY neon_auth.project_config (id, name, endpoint_id, created_at, updated_at, trusted_origins, social_providers, email_provider, email_and_password, allow_localhost, plugin_configs, webhook_config) FROM stdin;
531c88fb-99f9-4c43-acad-9d7dee6a16ab	minimarket-digital-integrado	ep-nameless-king-apywlpoi	2026-05-28 11:20:45.02+00	2026-05-28 11:20:45.02+00	[]	[{"id": "google", "isShared": true}]	{"type": "shared"}	{"enabled": true, "disableSignUp": false, "emailVerificationMethod": "otp", "requireEmailVerification": false, "autoSignInAfterVerification": true, "sendVerificationEmailOnSignIn": false, "sendVerificationEmailOnSignUp": false}	t	{"magicLink": {"config": {"expiresIn": 5, "disableSignUp": false}, "enabled": false}, "phoneNumber": {"config": {"otp_expires_in": 300}, "enabled": false}, "organization": {"config": {"creatorRole": "owner", "membershipLimit": 100, "organizationLimit": 10, "sendInvitationEmail": false}, "enabled": true}}	{"enabled": false, "enabledEvents": [], "timeoutSeconds": 5}
\.


--
-- TOC entry 3927 (class 0 OID 49169)
-- Dependencies: 269
-- Data for Name: session; Type: TABLE DATA; Schema: neon_auth; Owner: -
--

COPY neon_auth.session (id, "expiresAt", token, "createdAt", "updatedAt", "ipAddress", "userAgent", "userId", "impersonatedBy", "activeOrganizationId") FROM stdin;
\.


--
-- TOC entry 3926 (class 0 OID 49157)
-- Dependencies: 268
-- Data for Name: user; Type: TABLE DATA; Schema: neon_auth; Owner: -
--

COPY neon_auth."user" (id, name, email, "emailVerified", image, "createdAt", "updatedAt", role, banned, "banReason", "banExpires") FROM stdin;
\.


--
-- TOC entry 3929 (class 0 OID 49199)
-- Dependencies: 271
-- Data for Name: verification; Type: TABLE DATA; Schema: neon_auth; Owner: -
--

COPY neon_auth.verification (id, identifier, value, "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3917 (class 0 OID 17604)
-- Dependencies: 259
-- Data for Name: AuditLog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."AuditLog" (id, action, "entityType", "entityId", description, "oldValues", "newValues", "ipAddress", "userAgent", "createdAt", "userId", "branchId", "companyId") FROM stdin;
1	UPDATE	USER	1	Actualización de perfil	\N	\N	\N	\N	2026-05-19 02:39:49.876	1	1	1
2	CREATE	Product	1	Producto Inca Kola 1L creado correctamente	\N	\N	\N	\N	2026-05-21 16:29:31.682	3	\N	1
\.


--
-- TOC entry 3883 (class 0 OID 17413)
-- Dependencies: 225
-- Data for Name: Branch; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Branch" (id, name, code, logo, description, address, phone, email, city, state, country, "postalCode", "isActive", "isDeleted", "createdAt", "updatedAt", "deletedAt", "companyId") FROM stdin;
1	Minimarket Don Lucho	\N	\N	\N		\N	\N	\N	\N	\N	\N	t	f	2026-05-18 22:15:46.589	2026-05-18 22:15:46.589	\N	1
2	Juan Pérez	\N	\N	\N	Av. Lima 123	987654321	juan@gmail.com	Lima	\N	\N	\N	t	f	2026-05-20 12:29:33.567	2026-05-20 12:29:33.567	\N	1
\.


--
-- TOC entry 3891 (class 0 OID 17461)
-- Dependencies: 233
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Category" (id, name, description, "parentId", "isActive", "isDeleted", "companyId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Bebidas	Bebidas	\N	t	f	1	2026-05-21 16:27:55	2026-05-21 16:27:55	\N
2	Gaseosas	Gaseosa sabor cola	1	t	f	1	2026-05-21 16:28:19.753	2026-05-21 16:28:19.753	\N
\.


--
-- TOC entry 3881 (class 0 OID 17400)
-- Dependencies: 223
-- Data for Name: Company; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Company" (id, name, slug, ruc, address, phone, email, logo, website, "taxId", "legalRepresentative", "isActive", "isDeleted", "subscriptionTier", "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Don Luchito	don-luchito	09876543211		\N	\N	\N	\N	\N	\N	t	f	FREE	2026-05-18 22:15:46.194	2026-05-18 22:15:46.194	\N
\.


--
-- TOC entry 3923 (class 0 OID 17636)
-- Dependencies: 265
-- Data for Name: Configuration; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Configuration" (id, "companyName", logo, theme, language, "taxRate", currency, "defaultTaxEnabled", "notifyLowStock", "lowStockThreshold", "notifyExpiring", "expiringDaysAlert", "requireTwoFactor", "sessionTimeout", "passwordMinLength", "passwordExpiresDays", "requirePasswordChange", "allowMultipleLogins", "autoBackup", "backupFrequency", "maxLoginAttempts", "allowExport", "allowImport", "createdAt", "updatedAt", "companyId") FROM stdin;
1	\N	\N	light	es	0.00	PEN	t	t	5	t	30	f	3600	8	\N	f	t	t	DAILY	5	t	t	2026-05-22 01:39:59.423	2026-05-22 01:39:59.423	1
\.


--
-- TOC entry 3895 (class 0 OID 17488)
-- Dependencies: 237
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Customer" (id, name, "documentType", "documentNumber", email, phone, address, city, notes, "creditLimit", "currentDebt", "isActive", "createdAt", "updatedAt", "deletedAt", "companyId") FROM stdin;
1	Juan Pérez	DNI	74859632	juan@gmail.com	987654321	Av. Lima 123	Lima	Cliente frecuente	500.00	0.00	t	2026-05-20 12:22:35.881	2026-05-20 12:22:35.881	\N	1
\.


--
-- TOC entry 3925 (class 0 OID 17957)
-- Dependencies: 267
-- Data for Name: EmployeeProfile; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EmployeeProfile" (id, "userId", "position", department, shift, "createdAt", "updatedAt") FROM stdin;
1	2	almacenero	almacen	\N	2026-05-20 02:26:01.477	2026-05-20 02:26:01.477
\.


--
-- TOC entry 3899 (class 0 OID 17512)
-- Dependencies: 241
-- Data for Name: Inventory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Inventory" (id, stock, "reservedStock", "damagedStock", "productId", "branchId", "companyId", "lastUpdated", "createdAt") FROM stdin;
1	6	0	0	1	1	1	2026-05-21 16:34:37.163	2026-05-21 16:31:36.28
\.


--
-- TOC entry 3901 (class 0 OID 17523)
-- Dependencies: 243
-- Data for Name: InventoryHistory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."InventoryHistory" (id, type, quantity, "previousStock", "newStock", reason, reference, "createdAt", "productId", "inventoryId", "branchId", "companyId") FROM stdin;
1	PURCHASE	5	0	5	Compra PUR-20260521-00001	\N	2026-05-21 16:31:36.427	1	1	1	1
2	IN	1	5	6	SE ENCONTRO UN PRODUCTO	\N	2026-05-21 16:34:37.305	1	1	1	1
\.


--
-- TOC entry 3915 (class 0 OID 17593)
-- Dependencies: 257
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Notification" (id, title, message, type, "isRead", "readAt", "createdAt", "userId", "productId", "companyId") FROM stdin;
\.


--
-- TOC entry 3913 (class 0 OID 17582)
-- Dependencies: 255
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Payment" (id, amount, status, "paymentMethod", reference, notes, "transactionId", "paidAt", "dueDate", "saleId", "purchaseId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3903 (class 0 OID 17531)
-- Dependencies: 245
-- Data for Name: PaymentMethod_DB; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PaymentMethod_DB" (id, name, type, "accountNumber", "accountHolder", "isActive", "companyId") FROM stdin;
\.


--
-- TOC entry 3893 (class 0 OID 17473)
-- Dependencies: 235
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Product" (id, name, description, sku, barcode, "purchasePrice", "salePrice", "costPrice", "minStock", "maxStock", "expirationDate", "batchNumber", "requiresExpiration", "isActive", "isDeleted", "isFeatured", "createdAt", "updatedAt", "deletedAt", "companyId", "categoryId", "unitId", "profitAmount", "profitMargin") FROM stdin;
1	Inca Kola 1L	\N	SKU-1-LARZ	20938097118491	5.00	6.50	5.00	5	100	\N	\N	f	t	f	f	2026-05-21 16:29:31.534	2026-05-21 16:29:31.534	\N	1	2	1	1.50	30.00
\.


--
-- TOC entry 3909 (class 0 OID 17561)
-- Dependencies: 251
-- Data for Name: Purchase; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Purchase" (id, "purchaseNumber", total, subtotal, tax, discount, status, notes, "expectedDelivery", "actualDelivery", "createdAt", "updatedAt", "buyerId", "branchId", "companyId", "supplierId") FROM stdin;
1	PUR-20260521-00001	29.50	25.00	4.50	0.00	COMPLETED	Compra de prueba	\N	\N	2026-05-21 16:31:34.897	2026-05-21 16:31:34.897	3	1	1	1
\.


--
-- TOC entry 3911 (class 0 OID 17574)
-- Dependencies: 253
-- Data for Name: PurchaseDetail; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PurchaseDetail" (id, quantity, price, subtotal, tax, "purchaseId", "productId") FROM stdin;
1	5	5.00	25.00	0.00	1	1
\.


--
-- TOC entry 3905 (class 0 OID 17539)
-- Dependencies: 247
-- Data for Name: Sale; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Sale" (id, "saleNumber", total, subtotal, tax, discount, status, notes, "createdAt", "updatedAt", "sellerId", "branchId", "companyId", "customerId") FROM stdin;
\.


--
-- TOC entry 3907 (class 0 OID 17552)
-- Dependencies: 249
-- Data for Name: SaleDetail; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SaleDetail" (id, quantity, price, subtotal, discount, tax, "saleId", "productId") FROM stdin;
\.


--
-- TOC entry 3897 (class 0 OID 17500)
-- Dependencies: 239
-- Data for Name: Supplier; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Supplier" (id, name, ruc, email, phone, address, "contactPerson", website, notes, "currentDebt", "isActive", "createdAt", "updatedAt", "deletedAt", "companyId") FROM stdin;
1	Juan Pérez	\N	juan@gmail.com	987654321	Av. Lima 123	\N	\N	Cliente frecuente	0.00	t	2026-05-20 12:26:17.266	2026-05-20 12:26:17.266	\N	1
\.


--
-- TOC entry 3919 (class 0 OID 17614)
-- Dependencies: 261
-- Data for Name: SupportTicket; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SupportTicket" (id, "ticketNumber", title, description, status, priority, "resolutionNotes", "createdAt", "updatedAt", "resolvedAt", "userId", "assignedTo", "companyId", "closedAt", "deletedAt", "isTyping", "lastMessage", "lastMessageAt", "unreadCount", attachments) FROM stdin;
1	TK-1779422345061-6025	Problema con ventas	No puedo registrar ventas	OPEN	HIGH	\N	2026-05-22 03:59:05.064	2026-05-22 03:59:05.064	\N	1	\N	1	\N	\N	f	\N	\N	0	\N
2	TK-1779423795554-4655	fhgjhkj	hbjnk	IN_PROGRESS	MEDIUM	\N	2026-05-22 04:23:15.555	2026-05-22 04:23:37.42	\N	1	\N	1	\N	\N	f	\N	\N	0	\N
3	TK-1779472573201-9203	hjkfhsjk	hjfkdshjkfd	OPEN	MEDIUM	\N	2026-05-22 17:56:13.202	2026-05-23 17:52:57.458	2026-05-23 17:48:39.516	1	\N	1	2026-05-23 17:47:00.887	\N	f	\N	\N	0	\N
\.


--
-- TOC entry 3921 (class 0 OID 17626)
-- Dependencies: 263
-- Data for Name: TicketComment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."TicketComment" (id, message, "createdAt", "updatedAt", "ticketId", "userId", "deletedAt", "editedAt", "isEdited", "isInternal", "isRead", "messageType", "readAt", attachments) FROM stdin;
1	necesito una respuesta sobre ello	2026-05-22 04:18:59.65	2026-05-22 04:18:59.65	1	1	\N	\N	f	f	f	TEXT	\N	\N
2	ES URGENTE RESOLVER ESTE PROBLEMA	2026-05-22 15:02:52.779	2026-05-22 15:02:52.779	2	1	\N	\N	f	f	f	TEXT	\N	\N
3	Hola, me podrias responder	2026-05-23 17:48:28.768	2026-05-23 17:48:28.768	3	1	\N	\N	f	f	f	TEXT	\N	\N
4	kjkfsd	2026-05-23 18:01:42.681	2026-05-23 18:01:42.681	3	1	\N	\N	f	f	f	TEXT	\N	\N
5	hghj	2026-05-23 18:02:22.611	2026-05-23 18:02:22.611	3	1	\N	\N	f	f	f	TEXT	\N	\N
6	lll	2026-05-23 18:36:17.236	2026-05-23 18:36:17.236	1	1	\N	\N	f	f	f	TEXT	\N	\N
7	l	2026-05-23 18:38:04.173	2026-05-23 18:38:04.173	2	1	\N	\N	f	f	f	TEXT	\N	\N
8	jdjjd	2026-05-23 18:55:46.298	2026-05-23 18:55:46.298	2	1	\N	\N	f	f	f	TEXT	\N	\N
9	gjghj	2026-05-23 18:55:51.592	2026-05-23 18:55:51.592	2	1	\N	\N	f	f	f	TEXT	\N	\N
10	hjghj	2026-05-23 18:55:53.979	2026-05-23 18:55:53.979	2	1	\N	\N	f	f	f	TEXT	\N	\N
11	ghgjh	2026-05-23 18:55:56.143	2026-05-23 18:55:56.143	2	1	\N	\N	f	f	f	TEXT	\N	\N
12	fsfsd	2026-05-23 19:20:08.458	2026-05-23 19:20:08.458	3	1	\N	\N	f	f	f	TEXT	\N	\N
13	FHDSKJFHJKSHFJKDS	2026-05-23 19:36:00.857	2026-05-23 19:36:00.857	1	1	\N	\N	f	f	f	TEXT	\N	\N
\.


--
-- TOC entry 3889 (class 0 OID 17452)
-- Dependencies: 231
-- Data for Name: Unit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Unit" (id, name, abbreviation, type, "conversionFactor", "baseUnit", "isActive", "companyId") FROM stdin;
1	Bebidas	L	LITER	1.0000	\N	t	1
\.


--
-- TOC entry 3885 (class 0 OID 17425)
-- Dependencies: 227
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, name, email, password, role, phone, avatar, "isActive", "isDeleted", "isOnline", "lastLogin", "lastLogout", "loginAttempts", "lockedUntil", "twoFactorEnabled", "twoFactorSecret", "backupCodes", "managerId", "createdAt", "updatedAt", "deletedAt", "companyId", "branchId") FROM stdin;
2	jnksfdnjkd	dsjkfhdjks@gmail.com	$2a$10$li.wsJKy0cAHWDRmQlarDOn492QR3WWZGXatL1ACPabTTJ1N6q9Tm	EMPLOYEE	987656789	\N	t	f	f	\N	\N	0	\N	f	\N	\N	\N	2026-05-20 02:26:01.477	2026-05-20 02:26:01.477	\N	1	1
1	Luis Enrique Sandoval Carbonel	luissandovalcarbonel@gmail.com	$2a$10$3s/b5rzlHGTz19pfxEMEFu3acsFn7Trx1X2TGOXDuPHQbf4z8/meq	ADMIN	934049272	data:image/jpeg;base64,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	t	f	t	2026-05-28 13:23:06.754	\N	0	\N	f	\N	\N	\N	2026-05-18 22:15:47.239	2026-05-28 13:23:06.756	\N	1	1
3	Jimmy Sandoval	jimmy@gmail.com	$2a$10$sI8eRYffqJeT0S1TAfkhg.OgBLSTKgwAUN/mbL1xCHadkJtL0G4jq	MANAGER	+51987999879		t	f	t	2026-05-21 16:23:17.517	\N	0	\N	f	\N	\N	\N	2026-05-20 05:02:16.459	2026-05-21 16:23:17.518	\N	1	1
\.


--
-- TOC entry 3887 (class 0 OID 17441)
-- Dependencies: 229
-- Data for Name: UserSession; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UserSession" (id, token, "refreshToken", "ipAddress", "userAgent", "isActive", "expiresAt", "refreshExpiresAt", "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- TOC entry 3879 (class 0 OID 17239)
-- Dependencies: 221
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
1a85e07b-3572-4cf0-a358-b87d50ac8932	cdfcd8957f14b60eb4f52c0bd6e50e8b5ac68efc368c5bc4469de33eb95802ee	2026-05-18 22:11:24.886058+00	20260516155429	\N	\N	2026-05-18 22:11:23.879374+00	1
2fa46320-07ff-434f-8c14-bc9d7d7d662f	4ea0bc46edc59f543f4988b2d1bbace0b9a0380e9e5087d389492519f4a05711	2026-05-18 22:11:25.889654+00	20260517162341_add_product_profit_fields	\N	\N	2026-05-18 22:11:25.170378+00	1
a3416122-3e97-417b-9d01-07d60344da7d	f79946a86f9786b7cf1ed496c0707080a99fe173335c39be80403e2a0fd973bb	2026-05-18 22:11:27.378783+00	20260517163713_add_product_profit_field	\N	\N	2026-05-18 22:11:26.140871+00	1
2d0dd417-5029-4f16-9cb0-4ec6ddb727fb	fd90819ca743110897c4232ffdb73fa578b61d03cdae01f58e8d6198c9ed8dcd	2026-05-18 22:11:28.319608+00	20260518030222_add_employee_profile	\N	\N	2026-05-18 22:11:27.629359+00	1
dd198a73-433f-4d95-b7f4-e67e15339b3f	7dafdc9053b5b835699dbac12a4d107e0ff4fd5036fd8245ce69de3bd3d7e615	2026-05-22 03:22:35.684938+00	20260522032234_improve_support_chat	\N	\N	2026-05-22 03:22:35.042707+00	1
91156066-4d1e-4033-a65c-31523071cbb5	438169da630620bdc95fa62170a46b80c8b5169eb66bd64af74e6dede9e4f674	2026-05-22 03:30:33.612933+00	20260522033032_add_support_role	\N	\N	2026-05-22 03:30:33.072287+00	1
\.


--
-- TOC entry 3964 (class 0 OID 0)
-- Dependencies: 258
-- Name: AuditLog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."AuditLog_id_seq"', 2, true);


--
-- TOC entry 3965 (class 0 OID 0)
-- Dependencies: 224
-- Name: Branch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Branch_id_seq"', 2, true);


--
-- TOC entry 3966 (class 0 OID 0)
-- Dependencies: 232
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Category_id_seq"', 2, true);


--
-- TOC entry 3967 (class 0 OID 0)
-- Dependencies: 222
-- Name: Company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Company_id_seq"', 1, true);


--
-- TOC entry 3968 (class 0 OID 0)
-- Dependencies: 264
-- Name: Configuration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Configuration_id_seq"', 1, true);


--
-- TOC entry 3969 (class 0 OID 0)
-- Dependencies: 236
-- Name: Customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Customer_id_seq"', 1, true);


--
-- TOC entry 3970 (class 0 OID 0)
-- Dependencies: 266
-- Name: EmployeeProfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."EmployeeProfile_id_seq"', 1, true);


--
-- TOC entry 3971 (class 0 OID 0)
-- Dependencies: 242
-- Name: InventoryHistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."InventoryHistory_id_seq"', 2, true);


--
-- TOC entry 3972 (class 0 OID 0)
-- Dependencies: 240
-- Name: Inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Inventory_id_seq"', 1, true);


--
-- TOC entry 3973 (class 0 OID 0)
-- Dependencies: 256
-- Name: Notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Notification_id_seq"', 1, false);


--
-- TOC entry 3974 (class 0 OID 0)
-- Dependencies: 244
-- Name: PaymentMethod_DB_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."PaymentMethod_DB_id_seq"', 1, false);


--
-- TOC entry 3975 (class 0 OID 0)
-- Dependencies: 254
-- Name: Payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Payment_id_seq"', 1, false);


--
-- TOC entry 3976 (class 0 OID 0)
-- Dependencies: 234
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Product_id_seq"', 1, true);


--
-- TOC entry 3977 (class 0 OID 0)
-- Dependencies: 252
-- Name: PurchaseDetail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."PurchaseDetail_id_seq"', 1, true);


--
-- TOC entry 3978 (class 0 OID 0)
-- Dependencies: 250
-- Name: Purchase_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Purchase_id_seq"', 1, true);


--
-- TOC entry 3979 (class 0 OID 0)
-- Dependencies: 248
-- Name: SaleDetail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."SaleDetail_id_seq"', 1, false);


--
-- TOC entry 3980 (class 0 OID 0)
-- Dependencies: 246
-- Name: Sale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Sale_id_seq"', 1, false);


--
-- TOC entry 3981 (class 0 OID 0)
-- Dependencies: 238
-- Name: Supplier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Supplier_id_seq"', 1, true);


--
-- TOC entry 3982 (class 0 OID 0)
-- Dependencies: 260
-- Name: SupportTicket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."SupportTicket_id_seq"', 3, true);


--
-- TOC entry 3983 (class 0 OID 0)
-- Dependencies: 262
-- Name: TicketComment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."TicketComment_id_seq"', 13, true);


--
-- TOC entry 3984 (class 0 OID 0)
-- Dependencies: 230
-- Name: Unit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Unit_id_seq"', 1, true);


--
-- TOC entry 3985 (class 0 OID 0)
-- Dependencies: 228
-- Name: UserSession_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."UserSession_id_seq"', 1, false);


--
-- TOC entry 3986 (class 0 OID 0)
-- Dependencies: 226
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, true);


--
-- TOC entry 3655 (class 2606 OID 49193)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- TOC entry 3674 (class 2606 OID 49253)
-- Name: invitation invitation_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.invitation
    ADD CONSTRAINT invitation_pkey PRIMARY KEY (id);


--
-- TOC entry 3661 (class 2606 OID 49216)
-- Name: jwks jwks_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.jwks
    ADD CONSTRAINT jwks_pkey PRIMARY KEY (id);


--
-- TOC entry 3669 (class 2606 OID 49234)
-- Name: member member_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.member
    ADD CONSTRAINT member_pkey PRIMARY KEY (id);


--
-- TOC entry 3663 (class 2606 OID 49224)
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);


--
-- TOC entry 3665 (class 2606 OID 49226)
-- Name: organization organization_slug_key; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.organization
    ADD CONSTRAINT organization_slug_key UNIQUE (slug);


--
-- TOC entry 3676 (class 2606 OID 49275)
-- Name: project_config project_config_endpoint_id_key; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.project_config
    ADD CONSTRAINT project_config_endpoint_id_key UNIQUE (endpoint_id);


--
-- TOC entry 3678 (class 2606 OID 49273)
-- Name: project_config project_config_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.project_config
    ADD CONSTRAINT project_config_pkey PRIMARY KEY (id);


--
-- TOC entry 3650 (class 2606 OID 49177)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- TOC entry 3652 (class 2606 OID 49179)
-- Name: session session_token_key; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.session
    ADD CONSTRAINT session_token_key UNIQUE (token);


--
-- TOC entry 3646 (class 2606 OID 49168)
-- Name: user user_email_key; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- TOC entry 3648 (class 2606 OID 49166)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3659 (class 2606 OID 49208)
-- Name: verification verification_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.verification
    ADD CONSTRAINT verification_pkey PRIMARY KEY (id);


--
-- TOC entry 3621 (class 2606 OID 17612)
-- Name: AuditLog AuditLog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AuditLog"
    ADD CONSTRAINT "AuditLog_pkey" PRIMARY KEY (id);


--
-- TOC entry 3550 (class 2606 OID 17423)
-- Name: Branch Branch_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Branch"
    ADD CONSTRAINT "Branch_pkey" PRIMARY KEY (id);


--
-- TOC entry 3568 (class 2606 OID 17471)
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- TOC entry 3541 (class 2606 OID 17411)
-- Name: Company Company_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_pkey" PRIMARY KEY (id);


--
-- TOC entry 3640 (class 2606 OID 17663)
-- Name: Configuration Configuration_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Configuration"
    ADD CONSTRAINT "Configuration_pkey" PRIMARY KEY (id);


--
-- TOC entry 3578 (class 2606 OID 17498)
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);


--
-- TOC entry 3642 (class 2606 OID 17965)
-- Name: EmployeeProfile EmployeeProfile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EmployeeProfile"
    ADD CONSTRAINT "EmployeeProfile_pkey" PRIMARY KEY (id);


--
-- TOC entry 3591 (class 2606 OID 17529)
-- Name: InventoryHistory InventoryHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."InventoryHistory"
    ADD CONSTRAINT "InventoryHistory_pkey" PRIMARY KEY (id);


--
-- TOC entry 3587 (class 2606 OID 17521)
-- Name: Inventory Inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_pkey" PRIMARY KEY (id);


--
-- TOC entry 3619 (class 2606 OID 17602)
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- TOC entry 3594 (class 2606 OID 17537)
-- Name: PaymentMethod_DB PaymentMethod_DB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PaymentMethod_DB"
    ADD CONSTRAINT "PaymentMethod_DB_pkey" PRIMARY KEY (id);


--
-- TOC entry 3617 (class 2606 OID 17591)
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- TOC entry 3572 (class 2606 OID 17486)
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- TOC entry 3613 (class 2606 OID 17580)
-- Name: PurchaseDetail PurchaseDetail_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PurchaseDetail"
    ADD CONSTRAINT "PurchaseDetail_pkey" PRIMARY KEY (id);


--
-- TOC entry 3609 (class 2606 OID 17572)
-- Name: Purchase Purchase_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_pkey" PRIMARY KEY (id);


--
-- TOC entry 3603 (class 2606 OID 17559)
-- Name: SaleDetail SaleDetail_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SaleDetail"
    ADD CONSTRAINT "SaleDetail_pkey" PRIMARY KEY (id);


--
-- TOC entry 3599 (class 2606 OID 17550)
-- Name: Sale Sale_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Sale"
    ADD CONSTRAINT "Sale_pkey" PRIMARY KEY (id);


--
-- TOC entry 3583 (class 2606 OID 17510)
-- Name: Supplier Supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Supplier"
    ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY (id);


--
-- TOC entry 3627 (class 2606 OID 17624)
-- Name: SupportTicket SupportTicket_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SupportTicket"
    ADD CONSTRAINT "SupportTicket_pkey" PRIMARY KEY (id);


--
-- TOC entry 3635 (class 2606 OID 17634)
-- Name: TicketComment TicketComment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TicketComment"
    ADD CONSTRAINT "TicketComment_pkey" PRIMARY KEY (id);


--
-- TOC entry 3565 (class 2606 OID 17459)
-- Name: Unit Unit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Unit"
    ADD CONSTRAINT "Unit_pkey" PRIMARY KEY (id);


--
-- TOC entry 3558 (class 2606 OID 17450)
-- Name: UserSession UserSession_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserSession"
    ADD CONSTRAINT "UserSession_pkey" PRIMARY KEY (id);


--
-- TOC entry 3555 (class 2606 OID 17439)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3536 (class 2606 OID 17247)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3656 (class 1259 OID 49277)
-- Name: account_userId_idx; Type: INDEX; Schema: neon_auth; Owner: -
--

CREATE INDEX "account_userId_idx" ON neon_auth.account USING btree ("userId");


--
-- TOC entry 3671 (class 1259 OID 49283)
-- Name: invitation_email_idx; Type: INDEX; Schema: neon_auth; Owner: -
--

CREATE INDEX invitation_email_idx ON neon_auth.invitation USING btree (email);


--
-- TOC entry 3672 (class 1259 OID 49282)
-- Name: invitation_organizationId_idx; Type: INDEX; Schema: neon_auth; Owner: -
--

CREATE INDEX "invitation_organizationId_idx" ON neon_auth.invitation USING btree ("organizationId");


--
-- TOC entry 3667 (class 1259 OID 49280)
-- Name: member_organizationId_idx; Type: INDEX; Schema: neon_auth; Owner: -
--

CREATE INDEX "member_organizationId_idx" ON neon_auth.member USING btree ("organizationId");


--
-- TOC entry 3670 (class 1259 OID 49281)
-- Name: member_userId_idx; Type: INDEX; Schema: neon_auth; Owner: -
--

CREATE INDEX "member_userId_idx" ON neon_auth.member USING btree ("userId");


--
-- TOC entry 3666 (class 1259 OID 49279)
-- Name: organization_slug_uidx; Type: INDEX; Schema: neon_auth; Owner: -
--

CREATE UNIQUE INDEX organization_slug_uidx ON neon_auth.organization USING btree (slug);


--
-- TOC entry 3653 (class 1259 OID 49276)
-- Name: session_userId_idx; Type: INDEX; Schema: neon_auth; Owner: -
--

CREATE INDEX "session_userId_idx" ON neon_auth.session USING btree ("userId");


--
-- TOC entry 3657 (class 1259 OID 49278)
-- Name: verification_identifier_idx; Type: INDEX; Schema: neon_auth; Owner: -
--

CREATE INDEX verification_identifier_idx ON neon_auth.verification USING btree (identifier);


--
-- TOC entry 3545 (class 1259 OID 17673)
-- Name: Branch_code_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Branch_code_companyId_key" ON public."Branch" USING btree (code, "companyId");


--
-- TOC entry 3546 (class 1259 OID 17670)
-- Name: Branch_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Branch_companyId_idx" ON public."Branch" USING btree ("companyId");


--
-- TOC entry 3547 (class 1259 OID 17671)
-- Name: Branch_isActive_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Branch_isActive_idx" ON public."Branch" USING btree ("isActive");


--
-- TOC entry 3548 (class 1259 OID 17672)
-- Name: Branch_name_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Branch_name_companyId_key" ON public."Branch" USING btree (name, "companyId");


--
-- TOC entry 3566 (class 1259 OID 17683)
-- Name: Category_name_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Category_name_companyId_key" ON public."Category" USING btree (name, "companyId");


--
-- TOC entry 3537 (class 1259 OID 17668)
-- Name: Company_isActive_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Company_isActive_idx" ON public."Company" USING btree ("isActive");


--
-- TOC entry 3538 (class 1259 OID 17669)
-- Name: Company_isDeleted_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Company_isDeleted_idx" ON public."Company" USING btree ("isDeleted");


--
-- TOC entry 3539 (class 1259 OID 17664)
-- Name: Company_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Company_name_key" ON public."Company" USING btree (name);


--
-- TOC entry 3542 (class 1259 OID 17666)
-- Name: Company_ruc_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Company_ruc_key" ON public."Company" USING btree (ruc);


--
-- TOC entry 3543 (class 1259 OID 17665)
-- Name: Company_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Company_slug_key" ON public."Company" USING btree (slug);


--
-- TOC entry 3544 (class 1259 OID 17667)
-- Name: Company_taxId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Company_taxId_key" ON public."Company" USING btree ("taxId");


--
-- TOC entry 3638 (class 1259 OID 17712)
-- Name: Configuration_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Configuration_companyId_key" ON public."Configuration" USING btree ("companyId");


--
-- TOC entry 3574 (class 1259 OID 17687)
-- Name: Customer_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Customer_companyId_idx" ON public."Customer" USING btree ("companyId");


--
-- TOC entry 3575 (class 1259 OID 17689)
-- Name: Customer_documentNumber_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Customer_documentNumber_companyId_key" ON public."Customer" USING btree ("documentNumber", "companyId");


--
-- TOC entry 3576 (class 1259 OID 17688)
-- Name: Customer_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Customer_name_idx" ON public."Customer" USING btree (name);


--
-- TOC entry 3643 (class 1259 OID 17967)
-- Name: EmployeeProfile_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EmployeeProfile_userId_idx" ON public."EmployeeProfile" USING btree ("userId");


--
-- TOC entry 3644 (class 1259 OID 17966)
-- Name: EmployeeProfile_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "EmployeeProfile_userId_key" ON public."EmployeeProfile" USING btree ("userId");


--
-- TOC entry 3589 (class 1259 OID 17697)
-- Name: InventoryHistory_branchId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "InventoryHistory_branchId_idx" ON public."InventoryHistory" USING btree ("branchId");


--
-- TOC entry 3592 (class 1259 OID 17696)
-- Name: InventoryHistory_productId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "InventoryHistory_productId_idx" ON public."InventoryHistory" USING btree ("productId");


--
-- TOC entry 3584 (class 1259 OID 17693)
-- Name: Inventory_branchId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Inventory_branchId_idx" ON public."Inventory" USING btree ("branchId");


--
-- TOC entry 3585 (class 1259 OID 17694)
-- Name: Inventory_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Inventory_companyId_idx" ON public."Inventory" USING btree ("companyId");


--
-- TOC entry 3588 (class 1259 OID 17695)
-- Name: Inventory_productId_branchId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Inventory_productId_branchId_key" ON public."Inventory" USING btree ("productId", "branchId");


--
-- TOC entry 3595 (class 1259 OID 17698)
-- Name: PaymentMethod_DB_type_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "PaymentMethod_DB_type_companyId_key" ON public."PaymentMethod_DB" USING btree (type, "companyId");


--
-- TOC entry 3569 (class 1259 OID 17685)
-- Name: Product_categoryId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Product_categoryId_idx" ON public."Product" USING btree ("categoryId");


--
-- TOC entry 3570 (class 1259 OID 17684)
-- Name: Product_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Product_companyId_idx" ON public."Product" USING btree ("companyId");


--
-- TOC entry 3573 (class 1259 OID 17686)
-- Name: Product_sku_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Product_sku_companyId_key" ON public."Product" USING btree (sku, "companyId");


--
-- TOC entry 3614 (class 1259 OID 17710)
-- Name: PurchaseDetail_productId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PurchaseDetail_productId_idx" ON public."PurchaseDetail" USING btree ("productId");


--
-- TOC entry 3615 (class 1259 OID 17709)
-- Name: PurchaseDetail_purchaseId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PurchaseDetail_purchaseId_idx" ON public."PurchaseDetail" USING btree ("purchaseId");


--
-- TOC entry 3606 (class 1259 OID 17707)
-- Name: Purchase_branchId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Purchase_branchId_idx" ON public."Purchase" USING btree ("branchId");


--
-- TOC entry 3607 (class 1259 OID 17706)
-- Name: Purchase_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Purchase_companyId_idx" ON public."Purchase" USING btree ("companyId");


--
-- TOC entry 3610 (class 1259 OID 17705)
-- Name: Purchase_purchaseNumber_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Purchase_purchaseNumber_key" ON public."Purchase" USING btree ("purchaseNumber");


--
-- TOC entry 3611 (class 1259 OID 17708)
-- Name: Purchase_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Purchase_status_idx" ON public."Purchase" USING btree (status);


--
-- TOC entry 3604 (class 1259 OID 17704)
-- Name: SaleDetail_productId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SaleDetail_productId_idx" ON public."SaleDetail" USING btree ("productId");


--
-- TOC entry 3605 (class 1259 OID 17703)
-- Name: SaleDetail_saleId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SaleDetail_saleId_idx" ON public."SaleDetail" USING btree ("saleId");


--
-- TOC entry 3596 (class 1259 OID 17701)
-- Name: Sale_branchId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Sale_branchId_idx" ON public."Sale" USING btree ("branchId");


--
-- TOC entry 3597 (class 1259 OID 17700)
-- Name: Sale_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Sale_companyId_idx" ON public."Sale" USING btree ("companyId");


--
-- TOC entry 3600 (class 1259 OID 17699)
-- Name: Sale_saleNumber_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Sale_saleNumber_key" ON public."Sale" USING btree ("saleNumber");


--
-- TOC entry 3601 (class 1259 OID 17702)
-- Name: Sale_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Sale_status_idx" ON public."Sale" USING btree (status);


--
-- TOC entry 3579 (class 1259 OID 17690)
-- Name: Supplier_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Supplier_companyId_idx" ON public."Supplier" USING btree ("companyId");


--
-- TOC entry 3580 (class 1259 OID 17692)
-- Name: Supplier_name_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Supplier_name_companyId_key" ON public."Supplier" USING btree (name, "companyId");


--
-- TOC entry 3581 (class 1259 OID 17691)
-- Name: Supplier_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Supplier_name_idx" ON public."Supplier" USING btree (name);


--
-- TOC entry 3622 (class 1259 OID 42473)
-- Name: SupportTicket_assignedTo_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SupportTicket_assignedTo_idx" ON public."SupportTicket" USING btree ("assignedTo");


--
-- TOC entry 3623 (class 1259 OID 42471)
-- Name: SupportTicket_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SupportTicket_companyId_idx" ON public."SupportTicket" USING btree ("companyId");


--
-- TOC entry 3624 (class 1259 OID 42476)
-- Name: SupportTicket_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SupportTicket_createdAt_idx" ON public."SupportTicket" USING btree ("createdAt");


--
-- TOC entry 3625 (class 1259 OID 42477)
-- Name: SupportTicket_lastMessageAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SupportTicket_lastMessageAt_idx" ON public."SupportTicket" USING btree ("lastMessageAt");


--
-- TOC entry 3628 (class 1259 OID 42475)
-- Name: SupportTicket_priority_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SupportTicket_priority_idx" ON public."SupportTicket" USING btree (priority);


--
-- TOC entry 3629 (class 1259 OID 42474)
-- Name: SupportTicket_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SupportTicket_status_idx" ON public."SupportTicket" USING btree (status);


--
-- TOC entry 3630 (class 1259 OID 17711)
-- Name: SupportTicket_ticketNumber_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "SupportTicket_ticketNumber_key" ON public."SupportTicket" USING btree ("ticketNumber");


--
-- TOC entry 3631 (class 1259 OID 42472)
-- Name: SupportTicket_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SupportTicket_userId_idx" ON public."SupportTicket" USING btree ("userId");


--
-- TOC entry 3632 (class 1259 OID 42480)
-- Name: TicketComment_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TicketComment_createdAt_idx" ON public."TicketComment" USING btree ("createdAt");


--
-- TOC entry 3633 (class 1259 OID 42481)
-- Name: TicketComment_isRead_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TicketComment_isRead_idx" ON public."TicketComment" USING btree ("isRead");


--
-- TOC entry 3636 (class 1259 OID 42478)
-- Name: TicketComment_ticketId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TicketComment_ticketId_idx" ON public."TicketComment" USING btree ("ticketId");


--
-- TOC entry 3637 (class 1259 OID 42479)
-- Name: TicketComment_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TicketComment_userId_idx" ON public."TicketComment" USING btree ("userId");


--
-- TOC entry 3562 (class 1259 OID 17681)
-- Name: Unit_abbreviation_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Unit_abbreviation_companyId_key" ON public."Unit" USING btree (abbreviation, "companyId");


--
-- TOC entry 3563 (class 1259 OID 17682)
-- Name: Unit_name_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Unit_name_companyId_key" ON public."Unit" USING btree (name, "companyId");


--
-- TOC entry 3559 (class 1259 OID 17679)
-- Name: UserSession_refreshToken_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UserSession_refreshToken_key" ON public."UserSession" USING btree ("refreshToken");


--
-- TOC entry 3560 (class 1259 OID 17678)
-- Name: UserSession_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UserSession_token_key" ON public."UserSession" USING btree (token);


--
-- TOC entry 3561 (class 1259 OID 17680)
-- Name: UserSession_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UserSession_userId_idx" ON public."UserSession" USING btree ("userId");


--
-- TOC entry 3551 (class 1259 OID 17675)
-- Name: User_branchId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_branchId_idx" ON public."User" USING btree ("branchId");


--
-- TOC entry 3552 (class 1259 OID 17674)
-- Name: User_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_companyId_idx" ON public."User" USING btree ("companyId");


--
-- TOC entry 3553 (class 1259 OID 17677)
-- Name: User_email_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_companyId_key" ON public."User" USING btree (email, "companyId");


--
-- TOC entry 3556 (class 1259 OID 17676)
-- Name: User_role_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_role_idx" ON public."User" USING btree (role);


--
-- TOC entry 3729 (class 2606 OID 49194)
-- Name: account account_userId_fkey; Type: FK CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.account
    ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES neon_auth."user"(id) ON DELETE CASCADE;


--
-- TOC entry 3732 (class 2606 OID 49259)
-- Name: invitation invitation_inviterId_fkey; Type: FK CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.invitation
    ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES neon_auth."user"(id) ON DELETE CASCADE;


--
-- TOC entry 3733 (class 2606 OID 49254)
-- Name: invitation invitation_organizationId_fkey; Type: FK CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.invitation
    ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES neon_auth.organization(id) ON DELETE CASCADE;


--
-- TOC entry 3730 (class 2606 OID 49235)
-- Name: member member_organizationId_fkey; Type: FK CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.member
    ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES neon_auth.organization(id) ON DELETE CASCADE;


--
-- TOC entry 3731 (class 2606 OID 49240)
-- Name: member member_userId_fkey; Type: FK CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.member
    ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES neon_auth."user"(id) ON DELETE CASCADE;


--
-- TOC entry 3728 (class 2606 OID 49180)
-- Name: session session_userId_fkey; Type: FK CONSTRAINT; Schema: neon_auth; Owner: -
--

ALTER TABLE ONLY neon_auth.session
    ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES neon_auth."user"(id) ON DELETE CASCADE;


--
-- TOC entry 3718 (class 2606 OID 17913)
-- Name: AuditLog AuditLog_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AuditLog"
    ADD CONSTRAINT "AuditLog_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public."Branch"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3719 (class 2606 OID 17918)
-- Name: AuditLog AuditLog_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AuditLog"
    ADD CONSTRAINT "AuditLog_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3720 (class 2606 OID 17908)
-- Name: AuditLog AuditLog_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AuditLog"
    ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3679 (class 2606 OID 17713)
-- Name: Branch Branch_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Branch"
    ADD CONSTRAINT "Branch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3685 (class 2606 OID 17748)
-- Name: Category Category_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3686 (class 2606 OID 17743)
-- Name: Category Category_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3726 (class 2606 OID 17948)
-- Name: Configuration Configuration_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Configuration"
    ADD CONSTRAINT "Configuration_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3690 (class 2606 OID 17768)
-- Name: Customer Customer_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3727 (class 2606 OID 17968)
-- Name: EmployeeProfile EmployeeProfile_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EmployeeProfile"
    ADD CONSTRAINT "EmployeeProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3695 (class 2606 OID 17803)
-- Name: InventoryHistory InventoryHistory_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."InventoryHistory"
    ADD CONSTRAINT "InventoryHistory_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public."Branch"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3696 (class 2606 OID 17808)
-- Name: InventoryHistory InventoryHistory_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."InventoryHistory"
    ADD CONSTRAINT "InventoryHistory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3697 (class 2606 OID 17798)
-- Name: InventoryHistory InventoryHistory_inventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."InventoryHistory"
    ADD CONSTRAINT "InventoryHistory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES public."Inventory"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3698 (class 2606 OID 17793)
-- Name: InventoryHistory InventoryHistory_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."InventoryHistory"
    ADD CONSTRAINT "InventoryHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3692 (class 2606 OID 17783)
-- Name: Inventory Inventory_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public."Branch"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3693 (class 2606 OID 17788)
-- Name: Inventory Inventory_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3694 (class 2606 OID 17778)
-- Name: Inventory Inventory_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3715 (class 2606 OID 17903)
-- Name: Notification Notification_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3716 (class 2606 OID 17898)
-- Name: Notification Notification_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3717 (class 2606 OID 17893)
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3699 (class 2606 OID 17813)
-- Name: PaymentMethod_DB PaymentMethod_DB_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PaymentMethod_DB"
    ADD CONSTRAINT "PaymentMethod_DB_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3712 (class 2606 OID 17878)
-- Name: Payment Payment_paymentMethod_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_paymentMethod_fkey" FOREIGN KEY ("paymentMethod") REFERENCES public."PaymentMethod_DB"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3713 (class 2606 OID 17888)
-- Name: Payment Payment_purchaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES public."Purchase"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3714 (class 2606 OID 17883)
-- Name: Payment Payment_saleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES public."Sale"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3687 (class 2606 OID 17758)
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3688 (class 2606 OID 17753)
-- Name: Product Product_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3689 (class 2606 OID 17763)
-- Name: Product Product_unitId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES public."Unit"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3710 (class 2606 OID 17873)
-- Name: PurchaseDetail PurchaseDetail_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PurchaseDetail"
    ADD CONSTRAINT "PurchaseDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3711 (class 2606 OID 17868)
-- Name: PurchaseDetail PurchaseDetail_purchaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PurchaseDetail"
    ADD CONSTRAINT "PurchaseDetail_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES public."Purchase"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3706 (class 2606 OID 17853)
-- Name: Purchase Purchase_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public."Branch"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3707 (class 2606 OID 17848)
-- Name: Purchase Purchase_buyerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3708 (class 2606 OID 17858)
-- Name: Purchase Purchase_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3709 (class 2606 OID 17863)
-- Name: Purchase Purchase_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public."Supplier"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3704 (class 2606 OID 17843)
-- Name: SaleDetail SaleDetail_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SaleDetail"
    ADD CONSTRAINT "SaleDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3705 (class 2606 OID 17838)
-- Name: SaleDetail SaleDetail_saleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SaleDetail"
    ADD CONSTRAINT "SaleDetail_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES public."Sale"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3700 (class 2606 OID 17823)
-- Name: Sale Sale_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Sale"
    ADD CONSTRAINT "Sale_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public."Branch"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3701 (class 2606 OID 17828)
-- Name: Sale Sale_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Sale"
    ADD CONSTRAINT "Sale_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3702 (class 2606 OID 17833)
-- Name: Sale Sale_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Sale"
    ADD CONSTRAINT "Sale_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3703 (class 2606 OID 17818)
-- Name: Sale Sale_sellerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Sale"
    ADD CONSTRAINT "Sale_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3691 (class 2606 OID 17773)
-- Name: Supplier Supplier_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Supplier"
    ADD CONSTRAINT "Supplier_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3721 (class 2606 OID 17928)
-- Name: SupportTicket SupportTicket_assignedTo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SupportTicket"
    ADD CONSTRAINT "SupportTicket_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3722 (class 2606 OID 17933)
-- Name: SupportTicket SupportTicket_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SupportTicket"
    ADD CONSTRAINT "SupportTicket_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3723 (class 2606 OID 17923)
-- Name: SupportTicket SupportTicket_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SupportTicket"
    ADD CONSTRAINT "SupportTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3724 (class 2606 OID 17938)
-- Name: TicketComment TicketComment_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TicketComment"
    ADD CONSTRAINT "TicketComment_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public."SupportTicket"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3725 (class 2606 OID 17943)
-- Name: TicketComment TicketComment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TicketComment"
    ADD CONSTRAINT "TicketComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3684 (class 2606 OID 17738)
-- Name: Unit Unit_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Unit"
    ADD CONSTRAINT "Unit_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3683 (class 2606 OID 17733)
-- Name: UserSession UserSession_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserSession"
    ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3680 (class 2606 OID 17728)
-- Name: User User_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public."Branch"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3681 (class 2606 OID 17723)
-- Name: User User_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3682 (class 2606 OID 17718)
-- Name: User User_managerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2026-05-28 10:02:25

--
-- PostgreSQL database dump complete
--

\unrestrict rmzSOb9bKmIVqDGvvSGGaRhRfMesSWNsBDB9DCVVLzXqRD2mlxuWsauA9qxAUoX

