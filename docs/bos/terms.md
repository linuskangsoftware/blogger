---
outline: deep
title: Terms of Service | BOS
---

# Terms of Service for Blogger Online Services

**Effective Date:** 13/07/2025

These Terms of Service ("Terms") govern your use of the Blogger Online Services ("BOS"), a microservice that provides IP-fetching capabilities to blog owners using the BOS framework. The API service is available at https://app.linuskang.au/bos. You can view the list of endpoints that are used at ``/bos/debug``. 

By using BOS, you agree to these Terms.

## 1. Acceptance of Terms

By accessing or using BOS, you signify that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not use BOS.

## 2. Description of the Service

BOS is a lightweight microservice hosted by Linus Kang Software enabling blogger blog owners to retrieve IP addresses of users submitting comments on their blogs. The purpose of this feature is to:

- Help blog owners identify potential abuse or spam.

- Enhance comment moderation capabilities.

- Provide minimal security auditing.

## 3. IP Tracking and Use

When a user submits a comment, the BOS API (located at /bos/ip) returns the user's public IP address based on request headers (cf-connecting-ip, x-forwarded-for, etc.). BOS does not store, persist, or log IP addresses.

All IP address data is returned immediately to the requesting blog and is not retained by BOS. BOS simply acts as a passthrough mechanism to identify the IP address. However, simple client request IPs are stored for security monitoring purposes to prevent spam and abuse.

## 4. Opting Out

BOS is entirely optional and opt-out friendly. Blog owners can opt out of using BOS at any time by either:

- Setting the ``IP_FETCH_URL`` environment variable to ``none`` in ``.env``, which completely disables IP fetching & all other BOS features.

- Pointing the ``IP_FETCH_URL`` to a self-hosted service that returns an ``ip`` field in a JSON response, like this: ``{"ip": "192.168.1.1"}``.

## 5. Restrictions

You agree not to use BOS to:

- Collect or process personal data beyond what is necessary for comment moderation.

- Violate any applicable laws or regulations.

- Attempt to reverse engineer, tamper with, or misuse the service.

## 6. Availability

BOS is provided "as-is" and "as-available." We do not guarantee uninterrupted or error-free service. We reserve the right to suspend or terminate the service at any time without notice.

## 7. Limitation of Liability

Under no circumstances shall the BOS developers or maintainers be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of BOS.

## 8. Changes to the Terms

We reserve the right to modify these Terms at any time. You will be notified in our discord server when these terms change. Continued use of BOS constitutes acceptance of the updated Terms.

## 9. Right to Ban

We reserve the right to ban or block access to BOS, including individual IP addresses, at our sole discretion and without prior notice, for any reason including but not limited to misuse, abuse, or violation of these Terms.

## 10. Contact

For questions about these Terms, please contact: [bos@linus.id.au](mailto://bos@linus.id.au)