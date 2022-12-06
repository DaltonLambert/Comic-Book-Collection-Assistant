INSERT INTO public.users(
	user_id, username, password_hash, role)
	VALUES (?, ?, ?, ?);


INSERT INTO public.comic(
	comic_id, comic_name, author, release_date, collection_id)
	VALUES (?, ?, ?, ?, ?);



INSERT INTO public.collection(
	collection_id, collection_name)
	VALUES (?, ?);