import 'package:flutter/material.dart';

class PageWrapper extends StatelessWidget {
  final String? title;
  final Widget? child;

  const PageWrapper({
    Key? key,
    this.title,
    @required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: title != null
          ? AppBar(
              title: Text(title!),
            )
          : null,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: child,
      ),
    );
  }
}
