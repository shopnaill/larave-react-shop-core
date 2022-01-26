<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'price', 'category_id', 'old_price','cover'
    ];

    public function category()
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function related_products()
    {
        return $this->belongsToMany(Product::class, 'sub_categories', 'id', 'category_id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
