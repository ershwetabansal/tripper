export default class Cookie {
  put (item, value, expdays = 100) {
    let date = new Date()
    date.setTime(date.getTime() + (expdays * 24 * 60 * 60 * 1000))
    document.cookie = `${item}=${value};expires=${date.toUTCString()};`
  }

  get (item) {
    let name = `${item}=`
    let cookies = decodeURIComponent(document.cookie).split(';')
    let cookie = cookies
      .map(cookie => cookie.trim())
      .filter(cookie => cookie.includes(name))[0]

    return cookie
      ? cookie.substring(name.length, cookie.length)
      : ''
  }

  delete (name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  }
}
