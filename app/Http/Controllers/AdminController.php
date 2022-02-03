<?php

namespace App\Http\Controllers;

// import Model
use App\Http\Requests\CategoryRequest;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\SubCategoryRequest;
use Auth;
// import requests validation
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    // get all categories
    public function index()
    {
        $categories = Category::get();
        return view('admin.shop.cats', compact('categories'));
    }

    // sub categories
    public function sub_categories()
    {
        $categories = SubCategory::get();
        $main_categories = Category::get();
        $sub_cat = true;
        return view('admin.shop.cats', compact('categories', 'sub_cat', 'main_categories'));
    }

    // Products
    public function products()
    {
        return view('admin.shop.index');
    }

    // manage page
    public function manage()
    {
        return view('admin.shop.index');
    }

    public function add_product()
    {
        $categories = Category::get();
        $sub_categories = SubCategory::get();
        return view('admin.shop.new', compact('categories', 'sub_categories'));
    }

    // Categoroies

    public function save_cat(CategoryRequest $request)
    {
        Category::create($request->all());
        return redirect()->back();
    }

    public function update_cat(CategoryRequest $request, Category $cat)
    {
        $cat->update($request->all());
        return redirect()->back();
    }

    public function delete_cat(Request $request)
    {
        Category::find($request->cat_id)->delete();
        return redirect()->back();
    }

    // Sub Categories

    public function save_sub_cat(SubCategoryRequest $request)
    {
        SubCategory::create($request->all());
        return redirect()->back();
    }

    public function update_sub_cat(SubCategoryRequest $request, SubCategory $sub_cat)
    {
        $sub_cat->update($request->all());
        return redirect()->back();
    }

    public function delete_sub_cat(Request $request)
    {
        SubCategory::find($request->cat_id)->delete();
        return redirect()->back();
    }

    // Products

    public function save_product(ProductRequest $request)
    {
        // add cover to request
        $request->merge(['cover' => $request->images[0] ? $request->images[0]->store('products') : null]);

        Product::create($request->all());
        // return product id
        return response()->json(Product::latest()->first()->id);
    }

    public function update_product(ProductRequest $request, Product $product)
    {
        $product->update($request->all());
        return redirect()->back();
    }

    public function delete_product(Request $request)
    {
        Product::find($request->product_id)->delete();
        return redirect()->back();
    }

    // Product Images

    public function save_product_image(ProductImageValidation $request)
    {
        ProductImage::create($request->all());
        return redirect()->back();
    }

    public function update_product_image(ProductImageValidation $request, ProductImage $product_image)
    {
        $product_image->update($request->all());
        return redirect()->back();
    }

    public function delete_product_image(Request $request)
    {
        ProductImage::find($request->product_image_id)->delete();
        return redirect()->back();
    }

        // files 
        public function files(Request $request)
        {
            return response()->json($request->all());
        }

        // logout
        public function logout()
        {
            Auth::logout();
            return redirect()->route('login');
        }
}
