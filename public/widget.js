/**
 * Chatbot Form Builder — Embeddable Floating Widget Script
 * Lightweight, zero-dependency widget loader for external websites.
 */
(function () {
  "use strict";

  // Prevent duplicate execution
  if (window.__CHATBOT_FORM_WIDGET_LOADED__) return;
  window.__CHATBOT_FORM_WIDGET_LOADED__ = true;

  // Locate the current script tag to extract attributes
  var scriptTag =
    document.currentScript ||
    (function () {
      var scripts = document.getElementsByTagName("script");
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src && scripts[i].src.indexOf("widget.js") !== -1) {
          return scripts[i];
        }
      }
      return scripts[scripts.length - 1];
    })();

  var formId = scriptTag ? scriptTag.getAttribute("data-form-id") : null;
  var themeColor = (scriptTag && scriptTag.getAttribute("data-theme")) || "#4F46E5";
  var position = (scriptTag && scriptTag.getAttribute("data-position")) || "bottom-right";

  if (!formId) {
    console.error("[ChatbotWidget] Missing required 'data-form-id' attribute on widget script tag.");
    return;
  }

  // Derive host domain from script URL or fallback to current origin
  var scriptSrc = scriptTag ? scriptTag.src : "";
  var hostOrigin = "";
  if (scriptSrc) {
    try {
      var urlObj = new URL(scriptSrc);
      hostOrigin = urlObj.origin;
    } catch (e) {
      hostOrigin = window.location.origin;
    }
  } else {
    hostOrigin = window.location.origin;
  }

  var embedUrl = hostOrigin + "/embed/" + encodeURIComponent(formId);

  // Inject Stylesheet
  var style = document.createElement("style");
  style.id = "chatbot-widget-styles";
  style.textContent = [
    "#chatbot-widget-container { position: fixed; z-index: 2147483647; bottom: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }",
    position === "bottom-left" ? "#chatbot-widget-container { left: 20px; }" : "#chatbot-widget-container { right: 20px; }",
    "#chatbot-widget-btn { width: 56px; height: 56px; border-radius: 28px; background: " + themeColor + "; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4), 0 8px 10px -6px rgba(0,0,0,0.3); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #ffffff; transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease; outline: none; }",
    "#chatbot-widget-btn:hover { transform: scale(1.08); box-shadow: 0 20px 30px -10px rgba(0,0,0,0.5); }",
    "#chatbot-widget-btn:active { transform: scale(0.95); }",
    "#chatbot-widget-btn svg { width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.25s ease; }",
    "#chatbot-widget-window { position: fixed; bottom: 88px; " + (position === "bottom-left" ? "left: 20px;" : "right: 20px;") + " width: 380px; height: 600px; max-width: calc(100vw - 32px); max-height: calc(100vh - 110px); border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1); background: #020617; display: none; transform-origin: " + (position === "bottom-left" ? "bottom left" : "bottom right") + "; transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1); opacity: 0; transform: scale(0.92) translateY(12px); z-index: 2147483647; }",
    "#chatbot-widget-window.open { display: block; opacity: 1; transform: scale(1) translateY(0); }",
    "#chatbot-widget-iframe { width: 100%; height: 100%; border: none; display: block; }",
    "@media (max-width: 480px) { #chatbot-widget-window { width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; bottom: 0; right: 0; left: 0; border-radius: 0; } }",
    ".chatbot-ping { position: absolute; top: 0; right: 0; width: 14px; height: 14px; border-radius: 7px; background: #10b981; border: 2px solid #ffffff; }"
  ].join("\n");
  document.head.appendChild(style);

  // Build Container & Launcher Elements
  var container = document.createElement("div");
  container.id = "chatbot-widget-container";

  var btn = document.createElement("button");
  btn.id = "chatbot-widget-btn";
  btn.setAttribute("aria-label", "Open Chatbot Assistant");
  btn.innerHTML =
    '<svg class="chatbot-icon-chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>' +
    '<svg class="chatbot-icon-close" style="display:none;" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
    '<span class="chatbot-ping"></span>';

  var windowEl = document.createElement("div");
  windowEl.id = "chatbot-widget-window";

  var iframe = document.createElement("iframe");
  iframe.id = "chatbot-widget-iframe";
  iframe.title = "Chatbot Form";
  iframe.src = embedUrl;
  iframe.setAttribute("allow", "clipboard-write");

  windowEl.appendChild(iframe);
  container.appendChild(btn);
  document.body.appendChild(container);
  document.body.appendChild(windowEl);

  var isOpen = false;

  btn.addEventListener("click", function () {
    isOpen = !isOpen;
    var chatIcon = btn.querySelector(".chatbot-icon-chat");
    var closeIcon = btn.querySelector(".chatbot-icon-close");
    var ping = btn.querySelector(".chatbot-ping");

    if (isOpen) {
      windowEl.classList.add("open");
      if (chatIcon) chatIcon.style.display = "none";
      if (closeIcon) closeIcon.style.display = "block";
      if (ping) ping.style.display = "none";
    } else {
      windowEl.classList.remove("open");
      if (chatIcon) chatIcon.style.display = "block";
      if (closeIcon) closeIcon.style.display = "none";
    }
  });
})();
