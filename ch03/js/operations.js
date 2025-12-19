export function addScript(src, callback) {
    let script = document.createElement("script");
    script.src = src;
    script.onload = () => callback(script);
    script.onerror = () =>
      callback(null, new Error("failed to load script"));
    document.head.append(script);
  }

  function addAsParagraph(id, message, className) {
    let p = document.createElement("p");
    p.classList.add(className);
    p.innerText = message;
    document.getElementById(id).appendChild(p);
  }

export function addSuccessMessage(id, message) {
    addAsParagraph(id, message, "success");
  }

export function addErrorMessage(id, message) {
    addAsParagraph(id, message, "fail");
  }

export function addPromisifiedScript(src) {
    return new Promise(function (resolve, reject) {
      let script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error("failed to load script"));
      document.head.append(script);
    });
  }