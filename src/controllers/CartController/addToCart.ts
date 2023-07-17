import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import Cart, { ProductInCart } from '../../models/Cart'
import Product from '../../models/Product'
import Coupon from '../../models/Coupon'

export const addToCart = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const loggedInUser = (req as HavingIdentity).user
  const body = (req as Request).body

  if (!body.products) {
    return res.status(422).json({
      message: 'Missing data!',
    })
  }

  try {
    let totalPrice
    let totalPriceDiscount
    let totalDiscountCoupon = 0
    let totalPriceApplyCoupon
    let products: ProductInCart[] = []

    const foundCart = await Cart.findOne({
      user: loggedInUser._id,
    })

    // TODO: handle add to cart when cart of user is already exist
    if (foundCart) {
      products = products.concat(foundCart.products)

      for (let i = 0; i < body.products.length; i++) {
        const product: { id: string; count: number; colors: string[] } =
          body.products[i]

        if (!product.id || !product.count || !product.colors) {
          return res.status(400).json({
            message: 'Invalid data',
          })
        }

        const productData = await Product.findById(product.id).populate(
          'colors',
          'code'
        )

        if (!productData) {
          return res.status(422).json({
            message: 'The productId is invalid.',
          })
        }

        const findProductIndex = products.findIndex(
          (item) => item.product.toString() === product.id
        )

        if (findProductIndex === -1) {
          products.push({
            product: productData.id,
            colors: productData.colors as any,
            count: product.count,
            price: productData.price,
            priceDiscount: productData?.priceDiscount,
          })
        } else {
          products[findProductIndex] = {
            product: productData.id,
            colors: productData.colors as any,
            count: product.count + products[findProductIndex].count,
            price: productData.price,
            priceDiscount: productData?.priceDiscount,
          }
        }
      }

      totalPrice = products.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.count * currentValue.price
      }, 0)
      totalPriceDiscount = products.reduce((previousValue, currentValue) => {
        return (
          previousValue +
          currentValue.count *
            (currentValue.priceDiscount || currentValue.price)
        )
      }, 0)

      for (let i = 0; i < foundCart.coupons.length; i++) {
        const foundCoupon = await Coupon.findById(foundCart.coupons[i])

        if (!foundCoupon) {
          return res.status(422).json({
            message: 'The coupon not found',
          })
        }
        totalDiscountCoupon = totalDiscountCoupon + foundCoupon.discount
      }

      totalPriceApplyCoupon =
        totalPriceDiscount - totalPriceDiscount * (totalDiscountCoupon / 100)

      const updatedCart = await Cart.findByIdAndUpdate(
        foundCart.id,
        {
          products,
          priceBeforeDiscount: totalPrice,
          priceAfterDiscount: totalPriceDiscount,
          priceApplyCoupon: totalPriceApplyCoupon,
        },
        { new: true }
      )

      return res.status(200).json({
        message: 'Add to cart successfully.',
        data: updatedCart,
      })
    }

    // TODO: handle create new cart when cart of user is not exist
    for (let i = 0; i < body.products.length; i++) {
      const product: { id: string; count: number; color: string } =
        body.products[i]

      if (!product.id || !product.count || !product.count) {
        return res.status(400).json({
          message: 'Invalid data',
        })
      }

      const productData = await Product.findById(product.id).populate(
        'colors',
        'code'
      )

      if (!productData) {
        return res.status(422).json({
          message: 'The productId is invalid.',
        })
      }

      products.push({
        product: productData.id,
        colors: productData.colors as any,
        count: product.count,
        price: productData.price,
        priceDiscount: productData?.priceDiscount,
      })
    }

    totalPrice = products.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.count * currentValue.price
    }, 0)
    totalPriceDiscount = products.reduce((previousValue, currentValue) => {
      return (
        previousValue +
        currentValue.count * (currentValue.priceDiscount || currentValue.price)
      )
    }, 0)

    const newCart = await Cart.create({
      products,
      user: loggedInUser._id,
      priceAfterDiscount: totalPrice,
      priceBeforeDiscount: totalPriceDiscount,
      priceApplyCoupon: totalPriceDiscount,
    })

    return res.status(200).json({
      message: 'Add to new cart successfully.',
      data: newCart,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: `${error.message || 'Something went wrong!'}`,
    })
  }
}
