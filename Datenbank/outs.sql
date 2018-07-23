DROP DATABASE IF EXISTS outs;
CREATE DATABASE outs;
USE outs;

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

-- Trigger for inserting correct m_t needs to be implemented

CREATE TABLE new_messages(

    m_id INT AUTO_INCREMENT,
    f_id1 INT,
    f_id2 INT,
    m_m VARCHAR (1000),
    
    PRIMARY KEY(m_id)
);
    

-- f_id1 is sender, f_id2 ist recipient



INSERT INTO f_friends (f_id1, f_id2)
VALUES
(1,2),
(2,1),
(2,3),
(3,2),
(1,3),
(3,1),
(5,1),
(5,2),
(5,3),
(5,4),
(4,3),
(4,1);




