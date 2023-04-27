<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    //
    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'usuario' => 'required|string|max:255|unique:users',
            'contrasena' => 'required|string|min:6|max:255',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $user = new User;
        $user->nombre = $request->nombre;
        $user->apellido = $request->apellido;
        $user->usuario = $request->usuario;
        $user->contrasena = bcrypt($request->contrasena);
        $user->save();

        return response()->json(['user' => $user], 201);
    }

    public function login(Request $request){

        $user = User::where("usuario", "=", $request->usuario)->first();
        if(isset($user)){
            if(Hash::check($request->contrasena, $user->contrasena)){
                $token = $user->createToken("auth_token")->plainTextToken;
                return response()->json(['mensaje' => 'se inicio sesion', "user" => $user,"access_token" => $token ]);
            }else{
                return response()->json(['mensaje' => '*Contraseña incorrecta', "error"=>true], 401);
            }
        }else{
            return response()->json(['mensaje' => '*Usuario inexistente', 'error'=>true], 401);
        }
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response()->json(['mensaje' => 'sesion cerrada', 'status'=>1]);
    }

}
