export async function onRequest({ request }) {
  try {
    const randIntInclusive = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    // 竖屏随机 1~2942
    const num = randIntInclusive(1, 2942);
    const url = `https://b2.randomimg.987632.xyz/s/${num}.webp`;

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

