# Charity Project - Backend part
## Welcome our Project
Mr Rowshen is working remote in our project
Route	Method	POST Body	Description
/api/users	GET	Empty	List all users.
/api/users	POST	{
 "firstname":"davut",
 "lastname":"blk",
 "email":"davut@mail.com",
 "username":"dvtblk",
 "password":"dvtblk",
 "phone":"+123456789"
}
	Create a new user.
[ {"role": "User",
 "firstname": "davut",
 "lastname": "blk",
 "email": "davut@mail.com",
 "username": "dvtblk",
 "password": "dvtblk",
 "company": null,
 "address": null,
 "phone": 123456789,
 "last_login": "2021-03-18T14:52:37.047Z",
 "id": "6053693574905c049a25c9d8"
    }]
/api/users/:id	GET	Empty	Get a user.
/api/users/:id	PUT	{
    "firstname":"john2",
    "lastname":"doe2",    "email":"john@example.com",
    "username":"johndoe2",
    "password":"johndoe2",    "phone":"+12345678922222"
}	Update a user with new info.
/api/users/:id	DELETE	Empty	Delete a user.
/api/users/	DELETE	Empty	Delete all users.
Adres (Address) için;
Route	Method	POST Body	Description
/api/address	GET	Empty	List all addresses.
/api/address	POST	{
    "address_name":"ev",    "address_title":"Evim",
"country":"Turkey",
"city":"Manisa",    "state":"Turgutlu",    "post_code":"45310",    "id":"6053704974905c049a25c9de"
}
	Create a new address. {
 "role": "User",
"firstname": "john3
"lastname": "doe2",
"email": "john@example2.com",
"username": "johndoe3",
"password": "johndoe2",
"company": null,
"address": "605377f94ab73b05a7343664",
"phone": 12345678922222,
"last_login": "2021-03-18T15:22:49.571Z",
"id": "6053704974905c049a25c9de"}




/api/ address /:id	GET	Empty	Get an address.
{
 "address_name": "ev",
  "address_title": "Evim",
  "country": "Turkey",
  "city": "Manisa",
  "state": "Turgutlu",
  "post_code": "45310",
  "address_1": null,
  "address_2": null,
  "updated_at": null,
 "id": "605377f94ab73b05a7343664"    }

/api/ address /:id	PUT	{ "address_name":"evv",
"address_title":"Evimmmm",
"country":"Turkmenistan",
"city":"Aşgabat",
"state":"Turkos caicos",
"post_code":"11111145310",
"id":"6053704974905c049a25c9de"}
	Update an address with new info.
/api/ address /:id	DELETE	Empty	Delete an address.
/api/ address /:id
/	GET	Empty	The director's top 10 films.

