ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS pk_users_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planets DROP CONSTRAINT IF EXISTS pk_planets_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planets DROP CONSTRAINT IF EXISTS fk_user_id CASCADE;

DROP TABLE IF EXISTS public.users;
CREATE TABLE users (
    id serial NOT NULL,
    username varchar UNIQUE,
    email varchar,
    password varchar
);

DROP TABLE IF EXISTS public.planets;
CREATE TABLE planets (
    id serial NOT NULL,
    planet_id integer,
    planet_name varchar,
    user_id integer,
    submission_time timestamp without time zone
);

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_users_id PRIMARY KEY (id);

ALTER TABLE ONLY planets
    ADD CONSTRAINT pk_planets_id PRIMARY KEY (id);

ALTER TABLE ONLY planets
    ADD CONSTRAINT fk_user_id FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE;

INSERT INTO users VALUES(0, 'user', 'pass');
INSERT INTO users VALUES(1, 'user1', 'pass1');
INSERT INTO users VALUES(2, 'user2','pass2');
SELECT pg_catalog.setval('users_id_seq', 3, true);
