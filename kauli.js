class DomElement {
  constructor (selector) {
    this.selector = selector || null
    this.elems = typeof this.selector === 'string' ? document.querySelectorAll(this.selector) : selector
  }

  eventHandler = {
    bindEvent: function (element, event, action, capture) {
      element.addEventListener(event, action, capture)
      element.events = element.events || []
      element.events.push({ event, action, capture })
    },
    unbindEvent: function (element, event, action, capture) {
      if (!element.events) { return }
      if (action) {
        let i
        element.events.forEach((b, index) => {
          if (b.event === event && b.action === action && b.capture === capture) {
            i = index
          }
        })
        if (i !== undefined) {
          const b = element.events.splice(i, 1)[0]
          element.removeEventListener(b.event, b.action, b.capture)
        }
      } else {
        element.events.forEach(bound => {
          element.removeEventListener(bound.event, bound.action, bound.capture)
        })
        element.events = []
      }
    },
  }

  on (event, action, capture = true) {
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        this.eventHandler.bindEvent(this.elems[i], event, action, capture)
      }
    } else {
      this.eventHandler.bindEvent(this.elems, event, action, capture)
    }
    return new DomElement(this.elems)
  }

  off (event, action, capture = true) {
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        this.eventHandler.unbindEvent(this.elems[i], event, action, capture)
      }
    } else {
      this.eventHandler.unbindEvent(this.elems, event, action, capture)
    }
    return new DomElement(this.elems)
  }

  live (event, target, action, capture = true) {
    function doAction (triggered) {
      if (triggered.target.matches(target)) { action(triggered) }
    }
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        this.eventHandler.bindEvent(this.elems[i], event, doAction, capture)
      }
    } else {
      this.eventHandler.bindEvent(this.elems, event, doAction, capture)
    }
    return doAction
  }

  kill (event, doAction, capture = true) {
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        this.eventHandler.unbindEvent(this.elems[i], event, doAction, capture)
      }
    } else {
      this.eventHandler.unbindEvent(this.elems, event, doAction, capture)
    }
  }

  val (value) {
    if (value === undefined) {
      if (this.elems.length) {
        return this.elems[0].value
      } else {
        return this.elems.value
      }
    } else {
      if (this.elems.length) {
        for (let i = 0; i < this.elems.length; i++) {
          this.elems[i].value = value
        }
      } else {
        this.elems.value = value
      }
      return new DomElement(this.elems)
    }
  }

  attr (attr, value) {
    if (value === undefined) {
      if (this.elems.length) {
        return this.elems[0].getAttribute(attr)
      } else {
        return this.elems.getAttribute(attr)
      }
    } else {
      if (this.elems.length) {
        for (let i = 0; i < this.elems.length; i++) {
          this.elems[i].setAttribute(attr, value)
        }
      } else {
        this.elems.setAttribute(attr, value)
      }
      return new DomElement(this.elems)
    }
  }

  delAttr (attr) {
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        this.elems[i].removeAttribute(attr)
      }
    } else {
      this.elems.removeAttribute(attr)
    }
    return new DomElement(this.elems)
  }

  append (elem) {
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        this.elems[i].append(elem)
      }
    } else {
      this.elems.append(elem)
    }
    return new DomElement(this.elems)
  }

  prepend (elem) {
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        this.elems[i].prepend(elem)
      }
    } else {
      this.elems.prepend(elem)
    }
    return new DomElement(this.elems)
  }

  prev (elem) {
    if (elem === undefined) {
      let target = this.elems.length ? this.elems[0] : this.elems
      return new DomElement(this.elems.previousElementSibling)
    }
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        this.elems[i].parentNode.insertBefore(elem, this.elems[i])
      }
    } else {
      this.elems.parentNode.insertBefore(elem, this.elems)
    }
    return new DomElement(this.elems)
  }

  next (elem) {
    if (elem === undefined) {
      let target = this.elems.length ? this.elems[0] : this.elems
      return new DomElement(this.elems.nextElementSibling)
    }
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        this.elems[i].parentNode.insertBefore(elem, this.elems[i].nextSibling)
      }
    } else {
      this.elems.parentNode.insertBefore(elem, this.elems.nextSibling)
    }
    return new DomElement(this.elems)
  }

  del () {
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        this.elems[i].remove()
      }
    } else {
      this.elems.remove()
    }
  }

  hasClass (c) {
    if (this.elems.length) {
      return (!!this.elems[0].classList.contains(c))
    } else {
      return (!!this.elems.classList.contains(c))
    }
  }

  addClass (c) {
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        this.elems[i].classList.add(c)
      }
    } else {
      this.elems.classList.add(c)
    }
    return new DomElement(this.elems)
  }

  delClass (c) {
    if (this.elems.length) {
      for (const elem of this.elems) {
        elem.classList.remove(c)
      }
    } else {
      this.elems.classList.remove(c)
    }
    return new DomElement(this.elems)
  }

  toggleClass (c) {
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        if (this.elems[i].classList.contains(c)) {
          this.elems[i].classList.remove(c)
        } else {
          this.elems[i].classList.add(c)
        }
      }
    } else {
      if (this.elems.classList.contains(c)) {
        this.elems.classList.remove(c)
      } else {
        this.elems.classList.add(c)
      }
    }
    return new DomElement(this.elems)
  }

  html (html) {
    if (html === undefined) {
      if (this.elems.length) {
        return this.elems[0].innerHTML
      } else {
        return this.elems.innerHTML
      }
    } else {
      if (this.elems.length) {
        for (let i = 0; i < this.elems.length; i++) {
          this.elems[i].innerHTML = html
        }
      } else {
        this.elems.innerHTML = html
      }
      return new DomElement(this.elems)
    }
  }

  outer () {
    if (this.elems.length) {
      return this.elems[0].outerHTML
    }
    return this.elems.outerHTML
  }

  parent () {
    if (this.elems.length) {
      return new DomElement(this.elems[0].parentNode)
    }
    return new DomElement(this.elems.parentNode)
  }

  find (selector) {
    if (this.elems.length) {
      return new DomElement(this.elems[0].querySelectorAll(selector))
    }
    return new DomElement(this.elems.querySelectorAll(selector))
  }

  focus () {
    if (this.elems.length) {
      this.elems[0].focus()
    } else {
      this.elems.focus()
    }
    return new DomElement(this.elems)
  }

  blur () {
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        this.elems[i].blur()
      }
    } else {
      this.elems.blur()
    }
    return new DomElement(this.elems)
  }

  css (json) {
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        for (const key in json) {
          this.elems[i].style[key] = json[key]
        }
      }
    } else {
      for (const key in json) {
        this.elems.style[key] = json[key]
      }
    }
    return new DomElement(this.elems)
  }

  serialize () {
    const obj = {}
    if (this.elems.length) {
      for (let i = 0; i < this.elems.length; i++) {
        const inputs = this.elems[i].querySelectorAll('[name]')
        for (const input of inputs) {
          const name = input.getAttribute('name')
          const value = input.value
          obj[name] = value
        }
      }
    } else {
      const inputs = this.elems.querySelectorAll('[name]')
      for (const input of inputs) {
        const name = input.getAttribute('name')
        const value = input.value
        obj[name] = value
      }
    }
    return obj
  }
}

window.$ = selector => new DomElement(selector)

window.$.get = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function () {
      const DONE = 4
      const OK = 200
      const CREATED = 201
      if (xhr.readyState === DONE) {
        if (xhr.status === OK || xhr.status === CREATED) {
          resolve(xhr.responseText)
        } else {
          reject(xhr.status)
        }
      }
    }
    xhr.send()
  })
}

window.$.post = (url, json) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = function () {
      const DONE = 4
      const OK = 200
      const CREATED = 201
      if (xhr.readyState === DONE) {
        if (xhr.status === OK || xhr.status === CREATED) {
          return resolve(xhr.responseText)
        }
        reject(xhr.status)
      }
    }
    xhr.send(JSON.stringify(json))
  })
}

window.$.script = (url, options) => {
  const tag = document.createElement('script')
  tag.src = url
  if (options) {
    for (const key of Object.keys(options)) {
      tag[key] = options[key]
    }
  }
  document.getElementsByTagName('head')[0].appendChild(tag)
}

window.$.stylesheet = url => {
  const head = document.getElementsByTagName('head')[0]
  const tag = document.createElement('link')
  tag.rel = 'stylesheet'
  tag.type = 'text/css'
  tag.href = url
  head.insertBefore(tag, head.firstChild)
}

window.$.cookie = (name, value, options) => {
  if (!value) {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      if (!cookie) { continue }
      const chunks = cookie.split('=')
      const n = chunks[0].trim()
      const v = chunks[1].trim()
      if (n === name) { return v }
    }
  } else if (value === 'del') {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
  } else {
    let str = `${name}=${value}`
    if (options) {
      str += `;path=${options.path || '/'}`
      if (options.expires) { str += `;expires=${options.expires}` }
      if (options.maxage) { str += `;max-age=${options.maxage}` }
    }
    document.cookie = str
  }
}

window.$.clone = function (obj) { return JSON.parse(JSON.stringify(obj)) }
