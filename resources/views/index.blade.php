<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel Vue App</title>

        <!-- Styles -->
        <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    </head>
    <body>
    <div id="app"></div>
    <script src="{{ mix('/js/app.js') }}"></script>
    </body>
</html>
