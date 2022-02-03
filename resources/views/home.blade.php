@extends('layouts.app')
<style>
    .swiper-coverflow 
    {
        height:fit-content;
    }
</style>
@section('content')
    <div class="container">
        <div id="swiper"></div>
        <div class="row justify-content-center">
                <div class="page-content">
                    <div id="products_list"></div>
                </div>
        </div>
    </div>
@endsection
