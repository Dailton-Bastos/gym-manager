## :muscle: Gym Manager - Controle de Academia

App para gerenciar o controle de alunos e instrutores de uma academia

## :white_check_mark: Stack

- **NodeJS**
- **Express.js**
- **Nunjucks**
- **PostgreSQL**

## 🚀 Instalação e execução

1. É preciso ter o **PostgreSQL** instalado em sua máquina, se estiver usando o Docker;
   `docker run --name gymmanager -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
2. Criando a base de dados:

```sql
CREATE DATABASE gymmanager;
```

- Tabela de Instructors

```sql
CREATE  TABLE  public.instructors (
	id integer  NOT  NULL,
	avatar_url text,
	name  text,
	birth timestamp  without time zone,
	gender text,
	services text,
	created_at timestamp  without time zone
);
CREATE  SEQUENCE  public.instructors_id_seq
	AS  integer
	START  WITH  1
	INCREMENT  BY  1
	NO MINVALUE
	NO MAXVALUE
	CACHE  1;
ALTER  SEQUENCE  public.instructors_id_seq OWNED  BY public.instructors.id;
ALTER  TABLE  ONLY  public.instructors ALTER  COLUMN id SET  DEFAULT nextval('public.instructors_id_seq'::regclass);
ALTER  TABLE  ONLY  public.instructors
	ADD  CONSTRAINT instructors_pkey PRIMARY KEY (id);

```

- Tabela de Members

```sql
CREATE  TABLE  public.members (
	id integer  NOT  NULL,
	name  text,
	avatar_url text,
	email text,
	gender text,
	birth timestamp  without time zone,
	blood text,
	weight integer,
	height integer,
	instructor_id integer );
CREATE  SEQUENCE  public.members_id_seq
	AS  integer
	START  WITH  1
	INCREMENT  BY  1
	NO MINVALUE
	NO MAXVALUE
	CACHE  1;
ALTER  SEQUENCE  public.members_id_seq OWNED  BY  public.members.id;
ALTER  TABLE  ONLY public.members ALTER  COLUMN id SET  DEFAULT nextval('public.members_id_seq'::regclass);
ALTER  TABLE  ONLY  public.members
	ADD  CONSTRAINT members_pkey PRIMARY KEY (id);
```

3. Faça um clone desse repositório rodando
   `git clone https://github.com/Dailton-Bastos/gym-manager.git`

4. Entre na pasta rodando `gym-manager`;

5. Rode `yarn` para instalar as dependências;

6. Rode `yarn dev` para iniciar o servidor de desenvolvimento;

7. Abra `http://localhost:3000` para ver o projeto no navegador.

---

Um projeto [Rocketseat](<[https://github.com/Rocketseat/bootcamp-launchbase-05](https://github.com/Rocketseat/bootcamp-launchbase-05)>)

Feito com ♥️ by [Dailton Bastos](https://github.com/Dailton-Bastos)
