<!DOCTYPE html>
<html>

<head>
   <title>Verify Your Email</title>
   <style>
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
   }

   .main {
      width: 100%;
      padding: 40px;
      border-radius: 20px;
      background-color: #000;
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      row-gap: 20px;
   }

   h2 {
      color: #fff;
      font-size: 30px;
      border-bottom: 2px solid #ddd;
      width: fit-content;
   }

   h3 {
      background-color: #fff;
      padding: 15px;
      border-radius: 5px;
      width: fit-content;
      text-align: center;
      font-size: 24px;
      color: #000;
      border: 1px solid #ddd;
   }


   p {
      color: #fff;
      font-size: 18px;
   }

   img {
      width: 100px;
      height: 100px;
      object-fit: cover;
   }

   .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
   }
   </style>
</head>

<body>
   <div class="main">
      <div class="logo">
         <img src="{{ asset('logo.png') }}" alt="Logo">
      </div>
      <h2>Verify Your Email.</h2>
      <p>Your 6-digit verification code is:</p>
      <h3>{{$code}}</h3>
      <p>This code will expire in 15 minutes.</p>
      <p>If you didn't request this, you can ignore this email.</p>
   </div>
</body>

</html>