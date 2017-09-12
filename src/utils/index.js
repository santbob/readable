
export function printDate(timestamp) {
  const d = new Date(timestamp)
  return d.toUTCString().split(" ").slice(0,4).join(" ")
}

export function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}


export function truncate(content, length) {
    if(content.length <= length) {
      return content
    } else {
      return content.substring(0,length) + '...';
    }
}

export function pathFromUrl(url) {
  console.log("url", url)
  return url && url.split("/");
}
