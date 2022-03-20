import 'package:flutter/material.dart';

class CustomTheme {
  static ThemeData get _base => ThemeData(
        primarySwatch: Colors.purple,
        textTheme: const TextTheme(
          headline1: TextStyle(
            fontSize: 72.0,
            fontWeight: FontWeight.w800,
          ),
          headline4: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
      );

  static ThemeData get light => _base.copyWith(
        scaffoldBackgroundColor: Colors.deepPurple.shade100,
        textTheme: const TextTheme(
          headline1: TextStyle(
            color: Color.fromARGB(255, 235, 0, 235),
          ),
        ),
      );

  static ThemeData get dark => _base.copyWith(
        scaffoldBackgroundColor: Colors.deepPurple.shade900,
        textTheme: const TextTheme(
          headline1: TextStyle(
            color: Color.fromARGB(255, 65, 1, 65),
          ),
        ),
      );
}
