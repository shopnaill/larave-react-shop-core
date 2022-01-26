<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Requests\SubCategoryRequest;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function dashboard()
    {
        $total_orders = Order::count();
        $total_users = User::count();
        $total_products = Product::count();
        $total_categories = Category::count();
        $total_sub_categories = SubCategory::count();
        $total_order_items = OrderItem::count();

        return response()->json([
            'orders' => $total_orders,
            'users' => $total_users,
            'products' => $total_products,
            'categories' => $total_categories,
            'sub_categories' => $total_sub_categories,
            'order_items' => $total_order_items,
        ]);
    }
    //
    public function get_products()
    {
        $products = Product::with('category', 'images')->get();
        return response()->json($products);
    }

    public function categories()
    {
        $cats = Category::get();
        return response()->json($cats);
    }

    public function category(Category $category)
    {
        return response()->json($category);
    }

    public function sub_category(SubCategory $category)
    {
        return response()->json($category);
    }

    public function sub_categories()
    {
        $cats = SubCategory::with('category')->get();
        return response()->json($cats);
    }

    public function product(Product $product)
    {
        // return product with images
        $product = Product::with('images')->find($product->id);
        return response()->json($product);

    }

    public function related_products(Product $product)
    {
        $related_products = $product->related_products;
        return response()->json($related_products);
    }

    public function product_images(Product $product)
    {
        $images = $product->images;
        return response()->json($images);
    }

    public function save_product_image($data)
    {
        // create product image
        $product_image = ProductImage::create([
            'product_id' => $data->product_id,
            'image' => $data->image,
        ]);
        return response()->json(['success' => 'Image saved']);
    }

    // category update or create
    public function category_update_create(CategoryRequest $request)
    {
        if ($request->has('id') && $request->id != null) {
            $category = Category::find($request->id);
            $category->update($request->all());
        } else {
            Category::create($request->all());
        }
        return response()->json(['success' => 'Category saved']);
    }

    // delete category
    public function category_delete(Category $category)
    {
        $category->delete();
        return response()->json(['success' => 'Category deleted']);
    }

    // product_delete 
    public function product_delete(Product $product)
    {
        $product->delete();
        return response()->json(['success' => 'Product deleted']);
    }

    // sub_category_delete
    public function sub_category_delete(SubCategory $category)
    {
        $category->delete();
        return response()->json(['success' => 'Sub Category deleted']);
    }

    // sub category update or create
    public function sub_category_update_create(SubCategoryRequest $request)
    {
      //  return $request->all();

        if ($request->has('id') && $request->id != null) {
            $sub_category = SubCategory::find($request->id);
            $sub_category->update($request->all());
        } else {
            SubCategory::create($request->all());
        }
        return response()->json(['success' => 'Sub Category saved']);
    }

    // product update or create
    public function product_update_create(Request $request)
    {

        if ($request->has('id')) {
            // ckeck if is array and has image key
            if (is_array($request->images[0]) && array_key_exists('image', $request->images[0])) {
                $request->merge(['cover' => $request->images[0]['image']]);
            } else {
                $request->merge(['cover' => $request->images[0]]);
            }

            $product = Product::find($request->id);
            $product->update($request->all());

            // delete all images
            $product->images()->delete();

            // add new images
            foreach ($request->images as $image) {
                if (is_array($image) && array_key_exists('image', $image)) {
                    $product->images()->create([
                        'product_id' => $product->id,
                        'image' => $image['image'],
                    ]);
                } else {
                    $product->images()->create([
                        'product_id' => $product->id,
                        'image' => $image,
                    ]);
                }

            }
        } else {
            $request->merge(['cover' => $request->images[0]]);
            Product::create($request->all());
            foreach ($request->images as $image) {
                ProductImage::create([
                    'product_id' => Product::latest()->first()->id,
                    'image' => $image,
                ]);
            }
        }
        return response()->json(['success' => 'Product saved']);
    }

    // checkout order
    public function checkout(Request $request)
    {
        //   return response()->json([$request->all()]);
        if (auth()->user()) {
            $request->merge(['user_id' => auth()->user()->id]);
        }
        $request->merge(['status' => 'pending']);
        $order = Order::create($request->all());
        $this->save_order_items($request->cart, $order->id);
        return response()->json(['success' => 'Order saved']);
    }

    // save order items
    public function save_order_items($cart, $order_id)
    {


        foreach ($cart as $item) {
            $order_items = OrderItem::create([
                'order_id' => $order_id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quntity'],
            ]);
        }
        return response()->json($order_items);
    }

}
