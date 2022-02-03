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
use App\Models\Setting;
use App\Models\Slider;
use App\Models\SubCategory;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

// import storage
use Illuminate\Support\Facades\Storage;

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
        $total_sliders = Slider::count();

        return response()->json([
            'orders' => $total_orders,
            'users' => $total_users,
            'products' => $total_products,
            'categories' => $total_categories,
            'sub_categories' => $total_sub_categories,
            'order_items' => $total_order_items,
            'sliders' => $total_sliders,
        ]);
    }
    //
    public function get_products()
    {
        $products = Product::with('category', 'images')->get();
        return response()->json($products);
    }

    // orders
    public function orders()
    {
        $orders = Order::with('user', 'order_items')->get();
        return response()->json($orders);
    }

    // users
    public function users()
    {
        $users = User::withCount('orders')->withSum('orders', 'total_price')->get();
        return response()->json($users);
    }

    // sliders
    public function sliders()
    {
        $sliders = Slider::get();
        return response()->json($sliders);
    }

    public function slider(Slider $slider)
    {
        return response()->json($slider);
    }

    public function categories()
    {
        $cats = Category::with('subCategories')->get();
        return response()->json($cats);
    }

    // category_products 
    public function category_products(SubCategory $category)
    {
        $products = $category->products()->with('images')->get();
        return response()->json($products);
    }

    public function category(Category $category)
    {
        return response()->json($category);
    }

    public function sub_category(SubCategory $category)
    {
        return response()->json($category);
    }

    public function order($id)
    {
        $order = Order::with('user')->find($id);
        $order_items = OrderItem::where('order_id', $id)->with('product')->get();
        return response()->json([
            'orders' => $order,
            'order_items' => $order_items,
        ]);
    }

    public function approve_order($id)
    {
        $order = Order::find($id);
        $order->status = 'approved';
        $order->save();
        return response()->json($order);
    }

    public function deliver_order($id)
    {
        $order = Order::find($id);
        $order->status = 'delivered';
        $order->save();
        return response()->json($order);
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
        $related_products = $product->related_products();
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

    // slider update or create
    public function slider_update_create(Request $request)
    {

        if ($request->has('id') && $request->id != null) {

            $slider = Slider::findOrFail($request->id);
            $slider->title = $request->title;
            $image = $slider->image ? $slider->image : null;
            $slider->image = $request->hasFile('image') ? $request->image->store('sliders') : $image;

            if ($request->category_id && $request->category_id != 'null') {
                $slider->category_id = $request->category_id;
            }

            if ($request->product_id && $request->product_id != 'null') {
                $slider->product_id = $request->product_id;
            }
            $slider->save();

        } else {

            $slider = new Slider();
            $slider->title = $request->title;
            $slider->image = $request->image ? $request->image->store('sliders') : null;
            $slider->category_id = $request->category_id;
            $slider->product_id = $request->product_id;
            $slider->save();

        }
        return response()->json(['success' => 'Slider saved']);
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

    // slider_delete

    public function slider_delete(Slider $slider)
    {
        // delete image from storage
        Storage::delete($slider->image);
        $slider->delete();
        return response()->json(['message' => 'slider deleted']);
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

    // get user
    public function user($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }

    // get settings
    public function settings()
    {
        return response()->json(Setting::first());
    }

    // update settings
    public function settings_update(Request $request)
    {

        $setting = Setting::findOrFail(1);
        $setting->title = $request->title;
        $setting->logo = $request->hasFile('logo') ? $request->logo->store('settings') : $setting->logo;
        $setting->map_key = $request->map_key;
        $setting->phone = $request->phone;
        $setting->color1 = $request->color1;
        $setting->color2 = $request->color2;
        $setting->save();

        $user = User::findOrFail($request->user_id);
        $user->email = $request->email;
        if ($request->password && $request->password != null || $request->password != 'undefined') {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['success' => 'Settings updated']);
    }

}
