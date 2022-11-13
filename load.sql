# drop database if exists roofBlanket;

# create database if not exists roofBlanket;

# use roofBlanket;

drop table if exists homelessCollection;
CREATE TABLE if not exists `homelessCollection` (
    `id` int(11) NOT NULL,
    `fullname` varchar(256) NOT NULL,
    `age` int(11) NOT NULL,
    `gender` varchar(1) NOT NULL,
    `contact` int(8),
    `location` varchar(256) NOT NULL, 
    `special_needs` BOOLEAN NOT NULL,  # 0 normal, 1 special needs
    `duration` int(12) NOT NULL,
    `description` varchar(1000) NOT NULL,
    `photo_url` varchar(1000) NOT NULL,
    `employment` BOOLEAN NOT NULL,
    `education` varchar(100),
    `skills` varchar(1000),
    `employment_desc` varchar(1000),
    `completed` BOOLEAN NOT NULL,
    `time_created` DATETIME NOT NULL,
    `referral_id` int(11) NOT NULL,
    `home_offered_by` int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# Dummy Data for Homeless People
insert into homelessCollection values (1001,'Darren Kim',47,'M',null,'Singapore Management University',0,6,'Wears a striped shirt and carries a newspaper and red trolley around. Can be seen in the stretch in basement to LKC','https://roof-blanket.000webhostapp.com/dist//Images/homeless_male_default.jpeg',1,'','','',0,'2022-10-29 15:00:00', 10005, null);
insert into homelessCollection values (1002,'Geneva Tan',32,'F',null,'Ngee Ann City',1,4,'She likes to sing a lot', 'https://roof-blanket.000webhostapp.com/dist//Images/homeless_female_default.jpeg',1,'','','',0,'2022-10-29 15:20:00', 10001, null);
insert into homelessCollection values (1003,'Ronald McDonald',30,'M',null,'Rochor Road',0,5,'Very nice guy, will take the intiative to talk to you when you are near him', 'https://roof-blanket.000webhostapp.com/dist//Images/homeless_male_default.jpeg',1,'','','',0,'2022-10-29 15:40:00', 20005, null);
insert into homelessCollection values (1004,'Kentucky Lim',52,'M',null,'Changi Beach',0,3,'He is a very nice man. I interacted with him but he takes awhile to reply. He keeps smiling and i believe he carries around a lanyard saying that he has special needs.','https://roof-blanket.000webhostapp.com/dist//Images/homeless_male_default.jpeg',1,'','','',0,'2022-10-29 16:00:00', 20006, null);
insert into homelessCollection values (1005,'Angeline Tan',45,'F',null,'National University of Singapore',1,8,'She is seen frequently at the outside the science faculty wearing grey shirt with a trolley','https://roof-blanket.000webhostapp.com/dist//Images/homeless_female_default.jpeg',0,'','sewing','',1,'2022-10-29 16:20:00', 20001, null);
insert into homelessCollection values (1006,'Arnold Chen',35,'M',null,'Bedok North Street 4',0,11,'He is always at the void deck with a white singlet','https://roof-blanket.000webhostapp.com/dist//Images/homeless_male_default.jpeg',0,'','cashiering','',1,'2022-10-29 16:40:00', 10001, null);

drop table if exists usersCollection;
CREATE TABLE if not exists `usersCollection` (
    `id` int(11) NOT NULL,
    `username` varchar(30) NOT NULL,
    `password` varchar(256) NOT NULL,
    `email` varchar(256) NOT NULL,
    `firstname` varchar(256) NOT NULL,
    `lastname` varchar(256) NOT NULL,
    `photo_url` varchar(1000) NULL,
    `contact` int(8),
    `address` varchar(256),
    `housing_type` varchar(256),
    `num_homeless_attached` int(8),
    `num_homeless_helped` int(8),
    `employer_status` varchar(256), # Samaritan, GoodWill-Hosts, Employer
    `time_created` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into usersCollection values(10001, 'charliemike9021', '856674d6c8a8327f86fcbc8b59d5e23470075b5bcbec22a0257f3f4f4e1110df9e544e77120dd991b899662e649b5ca4c154094e3e76760549b24cb58b8ef3f3', 'cahr@gmail.com', 'Charlie', 'Kim', null, '98765432', 'yishun', '3-Room-HDB', '0', '2', 'Employer','2022-10-29 17:00:00'); # armyboyz21
insert into usersCollection values(10005,  'weiweiwei1001z' ,'0711f601eea668017e4780b645d6b764a24af0eee1d4aef503609bd1f2c5c051384cd0f86521e5a66f54170ac3ff2641cf0e1ce36816630c7f9e92c2985be80b', 'wei@gmail.com', 'Wei Wei', 'Sin', null, '92837465', 'Orchard', '5-Room-HDB', '1', '0', 'Samaritan','2022-10-29 17:20:00'); # purplec0W
insert into usersCollection values(20001, 'sl3episg00dd' ,'6b95063dcae72174b2ce514ac717a5a4bb048837101aa7e2e99c38ca6e45fb85fbf167964329a957cf4968c1201b15416d3114fbce321b9c398da25f43455242!', 'sleep@gmail.com', 'Good Sleep', 'Dei', null, '87456376', 'Bugis', '4-Room-HDB', '1', '1', 'Samaritan','2022-10-29 17:40:00'); # bambii00!
insert into usersCollection values(20005,  'slayslayslay29','bd3c090ea9427ba785b8846309754f7242b735999bd7020a4cdfe7e7c2399fbc84aad3ca2cff5008e724b0f910d5dbc07b89bbee1c564fb1e57ed2e394ab7df5', 'slay@gmail.com', 'Slay Slay', 'Slay', null, '96775883', 'Jurong', '4-Room-HDB', '0', '1', 'GoodWill-Hosts','2022-10-29 18:00:00'); # OslayMG
insert into usersCollection values(20006, 'lim', '2fb6d966084a0a450fd31dd2eab316cce47e73dc32300220735527c1d44d795449ed1f673da5d309304266dce8ee2b4514318d7d049374dab93a24c38b870c4f', 'lim@lim.com', 'lim', 'lin', null, 98262632, '', '', null, null, 'Samaritan','2022-10-29 19:00:00'); # lim

# homelessCollection (id, name, age, gender, contact, location, special_needs, duration, description, photo_url, employment, education, skills, employment_desc, completed)
# usersCollection (id, username, password, email, name, contact, address, housing_type, num_homeless_attached, num_homeless_helped, employer_status)

drop table if exists chatCollection;
CREATE TABLE if not exists `chatCollection` (
    `sender_id` int(11) NOT NULL,
    `receiver_id` int(11) NOT NULL,
    `message` varchar(1000) NOT NULL,
    `sent_datetime` DATETIME NOT NULL,
    `homeless_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into chatCollection values(10001, 10005, "Hello, I would like to interview the individual under your care for a job.", '2022-10-29 17:00:00', 1001);
insert into chatCollection values(10005, 10001, "Hi, sure thing, send me your company location and I'll let him know.", '2022-10-29 17:05:00', 1001);
insert into chatCollection values(10001, 10005, "Great! The interview will be on 1 November 2022 at SMU.", '2022-10-29 17:07:00', 1001);
insert into chatCollection values(10005, 10001, "He'll be there!", '2022-10-29 17:15:00', 1001);

drop table if exists homelessLocation;
CREATE TABLE if not exists `homelessLocation` (
    `id` int(11) NOT NULL,
    `latitude` float NOT NULL,
    `longitude` float NOT NULL,
    `note` varchar(1000)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into homelessLocation values(1001, 1.30379, 103.826, "he was wearing a red polo tee with a puppy logo.");
insert into homelessLocation values(1001, 1.2983, 103.835, "he is sometimes seen with a blue shade on him.");
insert into homelessLocation values(1002, 1.2962727, 103.8501578, "He has a white cat with him.");
insert into homelessLocation values(1002, 1.3005317, 103.8452356, "Was running away from 2 dogs.");
insert into homelessLocation values(1003, 1.42478, 103.815, "he is sometimes seen with a red shade on him.");
insert into homelessLocation values(1003, 1.36643, 103.803, "often seen him gazing at planes");
insert into homelessLocation values(1004, 1.31375, 103.877, "he has a stray dog with him. I do not know the breed of the dog but it is white and small.");
insert into homelessLocation values(1004, 1.30326, 103.849, "he now has 2 stray dogs, a white one and a brown one.");
insert into homelessLocation values(1005, 1.31049, 103.862, "often can see him singing a song");
insert into homelessLocation values(1005, 1.31203, 103.861, "I sometimes see him reciting a poem");
insert into homelessLocation values(1006, 1.31134, 103.866, "sleeping on a bench");
insert into homelessLocation values(1006, 1.31426, 103.847, "sitting on the bench");