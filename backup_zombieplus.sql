--
-- PostgreSQL database dump
--

\restrict SAVprgiKkkMOcRHTAO2hpLdQN11aVOehtV7IUSA5tgLvUl3qsfqnGl09fipbTpJ

-- Dumped from database version 18.6 (Debian 18.6-1.pgdg13+2)
-- Dumped by pg_dump version 18.6 (Debian 18.6-1.pgdg13+2)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- Name: leads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leads (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.leads OWNER TO postgres;

--
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    overview text NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    release_year integer NOT NULL,
    company_id uuid,
    cover character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- Name: tvshows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tvshows (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    overview text NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    release_year integer NOT NULL,
    company_id uuid,
    seasons integer NOT NULL,
    cover character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.tvshows OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (id, name, created_at, updated_at) FROM stdin;
1dae7531-d70f-4016-ae3e-b927e099c8b0	Columbia Pictures	2026-09-17 05:13:14.998253	2026-09-17 05:13:14.998253
169fc4c4-487a-45d1-a459-b81c9c7a2d43	Warner Bros. Pictures	2026-09-17 05:13:14.998253	2026-09-17 05:13:14.998253
6720f011-af06-41cc-8872-8c0f70010449	Universal Pictures	2026-09-17 05:13:14.998253	2026-09-17 05:13:14.998253
b3265f73-1f92-4f73-8a6d-6f06a09ab3a8	Netflix	2026-09-17 05:13:14.998253	2026-09-17 05:13:14.998253
a5e34cc5-189d-441f-8494-5dcc11b70664	Amazon Studios	2026-09-17 05:13:14.998253	2026-09-17 05:13:14.998253
acea49e5-4436-4c76-aa1f-1acc24c65869	Fox Entertainment	2026-09-17 05:13:14.998253	2026-09-17 05:13:14.998253
82e04efd-a9cb-490a-b235-e85aa5d061b1	Lionsgate Films	2026-09-17 05:13:14.998253	2026-09-17 05:13:14.998253
c8de2203-0c10-45e8-9e38-9d1ae1a0a99c	Sony Pictures	2026-09-17 05:13:14.998253	2026-09-17 05:13:14.998253
5473d281-1a9b-4f3b-a9bc-0e38ed0c2b3d	Paramount Pictures	2026-09-17 05:13:14.998253	2026-09-17 05:13:14.998253
ca52d0f0-f2c1-4a00-8f2d-7373aa25eaa4	Walt Disney Studios	2026-09-17 05:13:14.998253	2026-09-17 05:13:14.998253
\.


--
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leads (id, name, email, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (id, title, overview, featured, release_year, company_id, cover, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: tvshows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tvshows (id, title, overview, featured, release_year, company_id, seasons, cover, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password_hash, created_at, updated_at) FROM stdin;
866f1d7a-a70e-4224-b0e7-a4741a600f12	Admin	admin@qax.com	$2a$08$S8S.S8S.S8S.S8S.S8S.S8S.S8S.S8S.S8S.S8S.S8S.S8S.S8S.	2026-09-17 05:13:14.996067	2026-09-17 05:13:14.996067
\.


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: tvshows tvshows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tvshows
    ADD CONSTRAINT tvshows_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: movies movies_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id);


--
-- Name: tvshows tvshows_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tvshows
    ADD CONSTRAINT tvshows_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id);


--
-- PostgreSQL database dump complete
--

\unrestrict SAVprgiKkkMOcRHTAO2hpLdQN11aVOehtV7IUSA5tgLvUl3qsfqnGl09fipbTpJ

