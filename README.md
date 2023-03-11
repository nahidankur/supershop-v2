# supershop

`supershop` is an Ecommerce Application made with `Reactjs`, `Nodejs`, `Mongodb`, `Express`, `Redux`, `react-redux` & `react-bootstrap`. Users can pay the bill through `PayPal` or `Credit Card` to purchase his desired product. 

# App description:
Any user can choice his favourite product. He/She needs to be logged in or create an free user account to add the product to cart. Then he/she needs to pay before order the product. There is  `PayPal` payment gateway and Credit Card billing integration in the app to purchase products. There is also admin dashboard and only admin can use this function with is specia account to moniter app. I tried to make the interface very simple and clean to make sure it user friendly. The app is made only for educational perposes.

# [Live Preview Here](https://zany-gray-wildebeest-tie.cyclic.app/)

# Installation Guide

### Install the dependencies (Backend)

```bash
npm install
```

### Install Frontend dependencies

```bash
cd client
npm install
```

### Run both Express & React from root

```bash
npm run dev
```

### Build for production

```bash
cd client
npm run build
```

### Test production before deploy

After running a build in the client 👆, cd into the root of the project.  
And run...

Linux/Unix 
```bash
NODE_ENV=production node server.js
```
Windows Cmd Prompt or Powershell 
```bash
$env:NODE_ENV="production"
node server.js
```

Check in browser on [http://localhost:5000/](http://localhost:5000/)

## App Info

### Author

Nahid Karim Ankur

### Version

1.0.0

### License

This project is licensed under the MIT License


# Note:
The application is only made for educational perposes. Any commercial use of this application is strictly prohibited.
If you like the project please give a star. If there is any issue you face , you can send pull request, I will fix as soon as possible.
