-- Database: Datawarehause

create database Datawarehause;


-- Table: public.Actions

-- DROP TABLE IF EXISTS public."Actions";

CREATE TABLE IF NOT EXISTS public."Actions"
(
    id integer NOT NULL DEFAULT nextval('"Actions_id_seq"'::regclass),
    date timestamp with time zone NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    origin integer,
    destination integer,
    product integer,
    CONSTRAINT "Actions_pkey" PRIMARY KEY (id),
    CONSTRAINT "Actions_destination_fkey" FOREIGN KEY (destination)
        REFERENCES public."Warehouses" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT "Actions_origin_fkey" FOREIGN KEY (origin)
        REFERENCES public."Warehouses" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT "Actions_product_fkey" FOREIGN KEY (product)
        REFERENCES public."Products" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Actions"
    OWNER to postgres;


-- Table: public.Items

-- DROP TABLE IF EXISTS public."Items";

CREATE TABLE IF NOT EXISTS public."Items"
(
    id integer NOT NULL DEFAULT nextval('"Items_id_seq"'::regclass),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    warehouse integer,
    product integer,
    CONSTRAINT "Items_pkey" PRIMARY KEY (id),
    CONSTRAINT "Items_product_fkey" FOREIGN KEY (product)
        REFERENCES public."Products" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT "Items_warehouse_fkey" FOREIGN KEY (warehouse)
        REFERENCES public."Warehouses" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Items"
    OWNER to postgres;



-- Table: public.Products

-- DROP TABLE IF EXISTS public."Products";

CREATE TABLE IF NOT EXISTS public."Products"
(
    id integer NOT NULL DEFAULT nextval('"Products_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    price integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Products_pkey" PRIMARY KEY (id),
    CONSTRAINT "Products_name_key" UNIQUE (name),
    CONSTRAINT "Products_price_key" UNIQUE (price)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Products"
    OWNER to postgres;



-- Table: public.Roles

-- DROP TABLE IF EXISTS public."Roles";

CREATE TABLE IF NOT EXISTS public."Roles"
(
    id integer NOT NULL DEFAULT nextval('"Roles_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    level integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Roles_pkey" PRIMARY KEY (id),
    CONSTRAINT "Roles_level_key" UNIQUE (level),
    CONSTRAINT "Roles_name_key" UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Roles"
    OWNER to postgres;



-- Table: public.Users

-- DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    status boolean NOT NULL,
    password text COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    role_id integer,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id),
    CONSTRAINT "Users_username_key" UNIQUE (username),
    CONSTRAINT "Users_role_id_fkey" FOREIGN KEY (role_id)
        REFERENCES public."Roles" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;



-- Table: public.Warehouses

-- DROP TABLE IF EXISTS public."Warehouses";

CREATE TABLE IF NOT EXISTS public."Warehouses"
(
    id integer NOT NULL DEFAULT nextval('"Warehouses_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    capacity integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Warehouses_pkey" PRIMARY KEY (id),
    CONSTRAINT "Warehouses_capacity_key" UNIQUE (capacity),
    CONSTRAINT "Warehouses_name_key" UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Warehouses"
    OWNER to postgres;