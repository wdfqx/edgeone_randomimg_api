export async function onRequest({ request }) {
  try {
    const ua = request.headers.get("user-agent") || "";
    const isMobile = /Android|iPhone|iPad|iPod|Mobile|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isDesktop = !isMobile && /Windows NT|Macintosh|X11|Linux|Mac OS X|Ubuntu/i.test(ua);

    // 判向 — 桌面=横屏；移动=竖屏；未知=随机
    let type;
    if (isDesktop) type = "h";
    else if (isMobile) type = "s";
    else type = Math.random() < 0.5 ? "s" : "h";

    const randIntInclusive = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const num = type === "s" ? randIntInclusive(1, 2942) : randIntInclusive(1, 833);
    const url = `https://b2.randomimg.987632.xyz/${type}/${num}.webp`;

    const upstream = await fetch(url);
    const arrayBuffer = await upstream.arrayBuffer();

    return new Response(arrayBuffer, {
      status: upstream.status,
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "no-cache"
      }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal Error", msg: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

