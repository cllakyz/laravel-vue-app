<?php

use Illuminate\Http\Request;
//use App\Http\Resources\UserResource;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/*Route::get('/users', function (){
    if(rand(1,10) < 3){
        abort(500, 'Bir Hata Oluştu');
    }
    return [
        ['id' => 1, 'name' => 'Celal Akyüz', 'email' => 'cllakyz@hotmail.com'],
        ['id' => 2, 'name' => 'Zeki Kuş', 'email' => 'zekikus@hotmail.com'],
    ];
    //return factory('App\User', 10)->make();
    //return App\User::all();
    //return response()->json(['users' => App\User::all()], 200);
    //return new UserResource(App\User::find(1));
    //return UserResource::collection(App\User::all());
    //return UserResource::collection(App\User::paginate(10));
});*/

//Route::get('/users', 'Api\UserController@index');');

Route::apiResource('users', 'Api\UserController');
    //->only(['index', 'show']);