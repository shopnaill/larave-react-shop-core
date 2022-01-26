<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

require_once __DIR__ . '/admin.php';


Auth::routes();

// get any route except login and register
Route::get('/{any}', [HomeController::class, 'index'])->where('any', '.*');

// showLoginForm
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');