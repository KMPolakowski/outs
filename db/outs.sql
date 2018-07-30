DROP DATABASE IF EXISTS outsdb;
CREATE DATABASE outsdb;
USE outsdb;

CREATE TABLE u_users (
 
  u_id INT AUTO_INCREMENT,
  u_firstname VARCHAR(50) NOT NULL,
  u_lastname VARCHAR(50) NOT NULL,
  u_email VARCHAR(50) NOT NULL,
  u_password VARCHAR(200) NOT NULL,
  u_male BOOL  NOT NULL,
  u_online BOOL DEFAULT FALSE,

  PRIMARY KEY (u_id, u_email)
)
ENGINE = InnoDB;


CREATE TABLE f_friends (

	f_id1 INT,
    f_id2 INT
    
)
ENGINE = InnoDB;


CREATE TABLE m_messages (
	m_id INT AUTO_INCREMENT,
    f_id1 INT,
    f_id2 INT,
    m_t DATETIME,
    m_m VARCHAR(1000),
    
    PRIMARY KEY(m_id)
);


CREATE TABLE new_messages(

    m_id INT AUTO_INCREMENT,
    f_id1 INT,
    f_id2 INT,
    m_m VARCHAR (1000),
    
    PRIMARY KEY(m_id)
);

CREATE TABLE r_requests (
	f_id1 INT,
    f_id2 INT,
	r_id INT AUTO_INCREMENT,
    PRIMARY KEY(r_id)
);
    