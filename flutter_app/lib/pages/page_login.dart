import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class PageLogin extends StatelessWidget {
  const PageLogin({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Login"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const TextField(
              decoration: InputDecoration(
                labelText: 'Username',
              ),
            ),
            const SizedBox(height: 8),
            const TextField(
              decoration: InputDecoration(
                labelText: 'Password',
              ),
              obscureText: true,
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: () {
                context.go("/");
              },
              child: const Text("Login"),
            ),
            ElevatedButton(
                onPressed: () {
                  context.go("/");
                },
                child: const Text("Go to home page")),
            RichText(
              text: TextSpan(
                children: [
                  const TextSpan(
                    text: 'Are you new here? ',
                    style: TextStyle(color: Colors.black),
                  ),
                  TextSpan(
                    text: 'Register',
                    style: const TextStyle(color: Colors.blue),
                    recognizer: TapGestureRecognizer()
                      ..onTap = () {
                        context.go("/login/register");
                      },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
