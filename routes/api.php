<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\AdminController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('admin/dashboard', [ApiController::class , 'dashboard'])->middleware('auth.apikey');

Route::get('products',  [ApiController::class , 'get_products'])->middleware('auth.apikey');
Route::get('categories', [ApiController::class, 'categories'])->middleware('auth.apikey');
// orders
Route::get('orders', [ApiController::class, 'orders'])->middleware('auth.apikey');
Route::get('order/{id}', [ApiController::class, 'order'])->middleware('auth.apikey');
Route::post('order/approve/{id}', [ApiController::class, 'approve_order'])->middleware('auth.apikey');
Route::post('order/deliver/{id}', [ApiController::class, 'deliver_order'])->middleware('auth.apikey');

Route::get('categories/{category}', [ApiController::class, 'category'])->middleware('auth.apikey');
Route::get('sub_categories/{category}', [ApiController::class, 'sub_category'])->middleware('auth.apikey');
Route::post('category/update_create', [ApiController::class, 'category_update_create'])->middleware('auth.apikey');
Route::post('category/delete/{category}', [ApiController::class, 'category_delete'])->middleware('auth.apikey');
Route::post('sub_category/delete/{category}', [ApiController::class, 'sub_category_delete'])->middleware('auth.apikey');
Route::post('product/delete/{product}', [ApiController::class, 'product_delete'])->middleware('auth.apikey');

Route::post('sub_category/update_create', [ApiController::class, 'sub_category_update_create'])->middleware('auth.apikey');
Route::post('product/update_create', [ApiController::class, 'product_update_create'])->middleware('auth.apikey');
Route::post('checkout', [ApiController::class, 'checkout'])->middleware('auth.apikey');

Route::get('sub_categories', [ApiController::class, 'sub_categories'])->middleware('auth.apikey');

Route::post('categories', [ApiController::class, 'sub_categories'])->middleware('auth.apikey');
Route::get('product/{product}', [ApiController::class, 'product'])->middleware('auth.apikey');
Route::get('product/{product}/images', [ApiController::class, 'product_images'])->middleware('auth.apikey');
Route::get('product/related/{product}', [ApiController::class, 'related_products'])->middleware('auth.apikey');
Route::post('save_product_image', [ApiController::class, 'save_product_image'])->name('product_images.save_product_image');

Route::post('files', [AdminController::class, 'files']);
