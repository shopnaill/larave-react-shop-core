<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'address','phone', 'name', 'total_price', 'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // return with product 

    public function order_items() 
    {
        return $this->hasMany(OrderItem::class);
    }
 
}
