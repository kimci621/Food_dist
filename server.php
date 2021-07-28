<?php
$_POST = json_decode( file_get_contents("php://input"), true ); //преобразует JSON
echo var_dump($_POST);


// берет данные которые приходят с клиента,
// превращает их в строку,
// показывает обратно на клиенте
// .response(тело ответа с сервера)
