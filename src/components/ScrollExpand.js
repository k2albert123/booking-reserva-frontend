import { useCallback, useEffect, useRef } from 'react';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

const ScrollExpand = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  expandOnHover = false,
  enabled = true,
  children,
  className = '',
  style,
  ...rest
}) => {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const mediaRef = useRef(null);
  const titleRef = useRef(null);
  const overlayRef = useRef(null);
  const scrimRef = useRef(null);
  const hintRef = useRef(null);

  const propsRef = useRef({});
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    expandOnHover,
    enabled,
  };

  const applyProgress = useCallback((p) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;

    const c = propsRef.current;
    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;

    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;
    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) {
      scrimRef.current.style.opacity = `${c.overlayScrim * e}`;
    }

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;

      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      if (c.expandOnHover) return 0;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const handlePointerEnter = () => {
      target = 1;
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const handlePointerLeave = () => {
      target = 0;
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    if (propsRef.current.expandOnHover) {
      root.addEventListener('mouseenter', handlePointerEnter);
      root.addEventListener('mouseleave', handlePointerLeave);
      window.addEventListener('resize', onResize);
      const ro = new ResizeObserver(onResize);
      if (root) ro.observe(root);

      return () => {
        if (raf) cancelAnimationFrame(raf);
        root.removeEventListener('mouseenter', handlePointerEnter);
        root.removeEventListener('mouseleave', handlePointerLeave);
        window.removeEventListener('resize', onResize);
        ro.disconnect();
      };
    }

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    if (root) ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll, expandOnHover]);

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transformOrigin: 'center center',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          willChange: 'transform',
        }}
      />
    ) : (
      <img
        ref={mediaRef}
        src={src}
        alt={alt}
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transformOrigin: 'center center',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      />
    );

  const combinedStyle = {
    ...style,
    position: 'relative',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: useWindowScroll ? 'visible' : 'auto',
    overscrollBehavior: 'contain',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  return (
    <div
      ref={rootRef}
      className={className}
      style={combinedStyle}
      {...rest}
    >
      <div ref={trackRef} style={{ position: 'relative', width: '100%' }}>
        <div
          ref={stageRef}
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            overflow: 'hidden',
            minHeight: '100%',
            '--se-title-size': '4rem',
          }}
        >
          <div
            ref={frameRef}
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: 'inset(21% 29% 21% 29% round 24px)',
              willChange: 'clip-path',
              overflow: 'hidden',
              background: '#0f172a',
            }}
          >
            {media}
            <div
              ref={scrimRef}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.35))',
              }}
            />
            {children ? (
              <div
                ref={overlayRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '6%',
                  opacity: 0,
                  willChange: 'opacity, transform',
                  color: '#fff',
                }}
              >
                {children}
              </div>
            ) : null}
          </div>

          {title ? (
            <div
              ref={titleRef}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 6%',
                textAlign: 'center',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: '#fff',
                fontSize: 'var(--se-title-size)',
                textShadow: '0 2px 24px rgba(0,0,0,0.45)',
                pointerEvents: 'none',
                willChange: 'opacity, transform',
              }}
            >
              {title}
            </div>
          ) : null}

          {scrollHint ? (
            <div
              ref={hintRef}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 20,
                textAlign: 'center',
                letterSpacing: '0.02em',
                fontSize: '0.8125rem',
                color: 'rgba(255,255,255,0.7)',
                pointerEvents: 'none',
                willChange: 'opacity, transform',
              }}
            >
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
