# What is BOS?
Blogger Online Services (BOS) is a lightweight microservice built to help blog owners identify visitor IPs when users submit comments—without requiring accounts, cookies, or tracking. It’s designed to be privacy-friendly, fast, and fully optional.

## 🔍 What it does:
- Returns a commenter’s public IP for moderation/security.

- Never stores or logs IPs.

- Doesn’t track, fingerprint, or persist any user data.

## ⚙️ How it works:
- Blog owner calls /bos/ip to fetch the user's IP.

- BOS checks headers like cf-connecting-ip and sends the IP back.

- BOS does not store anything—stateless and ephemeral.

## ✅ Built-in privacy:
- Fully opt-out: Set IP_FETCH_URL=none to disable BOS.

- Self-host option supported.

- No cookies, no analytics, no storage.

## Terms & Privacy

The TOS and Privacy Policy can be found in the BOS Terms and BOS Privacy sections of the documentation.