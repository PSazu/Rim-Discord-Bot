const fetch = require('node-fetch');

async function FetchUserData(api) {
    const res = await fetch(api);
    if(!res.ok) {
        const message = `Error has occured during fetch ${res.status}`
        throw new Error(message);
    }
    const data = await res.json();
    return data;
}

function Thumbnail(arr) {
    switch(arr[0]) {
      case 'javascript': return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png';
      case 'python': return 'https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png';
      case 'java': return 'https://1000logos.net/wp-content/uploads/2020/09/Java-Logo-500x313.png';
      case 'rust': return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/2048px-Rust_programming_language_black_logo.svg.png';
      case 'sql': return 'https://cdn.icon-icons.com/icons2/1502/PNG/512/officedatabase_103574.png';
      case 'c': return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png';
      case 'csharp': return 'https://cdn.icon-icons.com/icons2/2415/PNG/512/csharp_original_logo_icon_146578.png';
    }
}


module.exports = {
    FetchUserData,
    Thumbnail
}

  









