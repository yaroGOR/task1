--
-- PostgreSQL database dump
--

-- Dumped from database version 13.12
-- Dumped by pg_dump version 15.2

-- Started on 2024-03-18 18:31:09 EET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3307 (class 0 OID 375374)
-- Dependencies: 202
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- INSERT INTO public.migrations VALUES (4, 1710777675592, 'CreateTables1710777675592');


--
-- TOC entry 3308 (class 0 OID 375464)
-- Dependencies: 203
-- Data for Name: news_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.news_items VALUES ('e0f1aabf-a07c-4046-aa17-b3fcb325af66', true, '2024-03-18T16:26:29.185Z', '2024-03-18 18:26:29.185302', '2024-03-18 18:26:29.185302');
INSERT INTO public.news_items VALUES ('63870e52-d1d1-450c-8a25-34013f12cf01', true, '2024-03-18T16:26:41.733Z', '2024-03-18 18:26:41.733074', '2024-03-18 18:26:41.733074');
INSERT INTO public.news_items VALUES ('db5b28d4-fea3-4aae-8f1b-8f037e658a3d', true, '2024-03-18T16:26:47.064Z', '2024-03-18 18:26:47.064215', '2024-03-18 18:26:47.064215');
INSERT INTO public.news_items VALUES ('6935a008-3cfa-4880-8f94-e2c107bed524', true, '2024-03-18T16:26:51.443Z', '2024-03-18 18:26:51.442878', '2024-03-18 18:26:51.442878');
INSERT INTO public.news_items VALUES ('d7edaa7b-5b29-4613-aaa9-9db5de2d58f4', false, NULL, '2024-03-18 18:26:57.967801', '2024-03-18 18:26:57.967801');


--
-- TOC entry 3309 (class 0 OID 375476)
-- Dependencies: 204
-- Data for Name: news_item_translations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.news_item_translations VALUES ('f79a5d93-83d5-4783-997a-d2ec3559a0b8', 'en', 'published 5', 'published desc 5', 'e0f1aabf-a07c-4046-aa17-b3fcb325af66');
INSERT INTO public.news_item_translations VALUES ('2fcbd60c-3ea1-4928-b007-51f1bd6a1698', 'fr', 'published 5', 'published desc 5', 'e0f1aabf-a07c-4046-aa17-b3fcb325af66');
INSERT INTO public.news_item_translations VALUES ('390f0c8f-ccce-4a03-8cbe-f6fd7db64051', 'en', 'published 4', 'published desc 4', '63870e52-d1d1-450c-8a25-34013f12cf01');
INSERT INTO public.news_item_translations VALUES ('f5a103d5-af26-4160-8649-6f135a198a69', 'en', 'published 3', 'published desc 3', 'db5b28d4-fea3-4aae-8f1b-8f037e658a3d');
INSERT INTO public.news_item_translations VALUES ('543f6a39-1e57-4253-b062-925fc9790e9e', 'en', 'published 2', 'published desc 2', '6935a008-3cfa-4880-8f94-e2c107bed524');
INSERT INTO public.news_item_translations VALUES ('9e7520e3-957e-485d-a070-0149f89b9d5f', 'en', 'published 1', 'published desc 1', 'd7edaa7b-5b29-4613-aaa9-9db5de2d58f4');


--
-- TOC entry 3315 (class 0 OID 0)
-- Dependencies: 201
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

-- SELECT pg_catalog.setval('public.migrations_id_seq', 4, true);


-- Completed on 2024-03-18 18:31:09 EET

--
-- PostgreSQL database dump complete
--

