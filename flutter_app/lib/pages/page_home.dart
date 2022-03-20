import 'package:flutter/material.dart';
import 'package:flutter_app/pages/page_wrapper.dart';
import 'package:go_router/go_router.dart';

class PageHome extends StatelessWidget {
  const PageHome({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return PageWrapper(
      title: "Welcome page",
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Welcome',
              style: Theme.of(context).textTheme.headline4,
            ),
            ElevatedButton(
              onPressed: () {
                context.go("/login");
              },
              child: const Text("Go to login page"),
            ),
          ],
        ),
      ),
    );
  }
}
