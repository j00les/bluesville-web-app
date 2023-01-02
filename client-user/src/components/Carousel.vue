<script></script>
<template>
  <div class="mx-auto rounded-md mt-9 carousel">
    <div id="slide1" class="relative w-full carousel-item">
      <img
        src="https://www.thebluesville.com/wp-content/uploads/2022/03/DSCF9911-scaled.jpg"
        class="object-cover w-full"
      />
      <div
        class="absolute text-5xl text-red-500 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      ></div>
      <div
        class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
      >
        <a href="#slide4" class="btn btn-circle">❮</a>
        <a href="#slide2" class="btn btn-circle">❯</a>
      </div>
    </div>
    <div id="slide2" class="relative w-full carousel-item">
      <img
        src="https://www.thebluesville.com/wp-content/uploads/2020/02/DSC00395.jpg"
        class="object-cover w-full"
      />
      <div
        class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
      >
        <a href="#slide1" class="btn btn-circle">❮</a>
        <a href="#slide3" class="btn btn-circle">❯</a>
      </div>
    </div>
    <div id="slide3" class="relative w-full carousel-item">
      <img
        src="https://www.thebluesville.com/wp-content/uploads/2022/09/000019-min-1.png"
        class="object-cover w-full"
      />
      <div
        class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
      >
        <a href="#slide2" class="btn btn-circle">❮</a>
        <a href="#slide4" class="btn btn-circle">❯</a>
      </div>
    </div>
  </div>
</template>

<style>
.object-cover {
  object-fit: cover;
}

.carousel {
  height: 23rem;
  width: 72rem;
  overflow: hidden;
}
</style>
