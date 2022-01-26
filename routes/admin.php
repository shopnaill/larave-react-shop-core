<?php
use App\Http\Controllers\AdminController;

// admin routes

// admin prefix routes
Route::prefix('admin')->group(function () {

    // mange page
    Route::get('/', [AdminController::class, 'manage'])->name('admin.manage');

    // category routes
    Route::get('/categories', [AdminController::class, 'index'])->name('categories.index');
    Route::post('/save_cat', [AdminController::class, 'save_cat'])->name('categories.save_cat');
    Route::post('/update_cat/{cat}', [AdminController::class, 'update_cat'])->name('categories.update_cat');
    Route::post('/delete_cat', [AdminController::class, 'delete_cat'])->name('categories.delete_cat');

    // sub category routes
    Route::get('/sub_categories', [AdminController::class, 'sub_categories'])->name('sub_categories.index');
    Route::post('/save_sub_cat', [AdminController::class, 'save_sub_cat'])->name('sub_categories.save_sub_cat');
    Route::post('/update_sub_cat/{sub_cat}', [AdminController::class, 'update_sub_cat'])->name('sub_categories.update_sub_cat');
    Route::post('/delete_sub_cat', [AdminController::class, 'delete_sub_cat'])->name('sub_categories.delete_sub_cat');

    // product routes
    Route::get('/products', [AdminController::class, 'products'])->name('products.index');
    Route::get('/add_product', [AdminController::class, 'add_product'])->name('products.add_product');
    Route::post('/save_product', [AdminController::class, 'save_product'])->name('products.save_product');
    Route::post('/update_product/{product}', [AdminController::class, 'update_product'])->name('products.update_product');
    Route::post('/delete_product', [AdminController::class, 'delete_product'])->name('products.delete_product');

    // product images routes
 //   Route::post('/save_product_image', [AdminController::class, 'save_product_image'])->name('product_images.save_product_image');
    Route::post('/update_product_image/{product_image}', [AdminController::class, 'update_product_image'])->name('product_images.update_product_image');
    Route::post('/delete_product_image', [AdminController::class, 'delete_product_image'])->name('product_images.delete_product_image');

});
