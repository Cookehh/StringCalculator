Solution for StringCalculator Problem for Easyfundraising by Chloe McMullan.

To run this solution:
`npm build` in string-validator folder (..\string-validator)
`npm test` in string-validator folder (..\string-validator)

I implemented a solution using two design patterns: Strategy and Chain of Responsibility, with heavy focus on functionality instead of UI.

I used strategy to allow many different algorithms to be used by the input field without requiring code modifications for the input file.

I used chain of responsibility to extract different validation functionalities into their own classes to allow them to be re-usable for the next parts, as well as allowing for validation to be extracted down into single-responsibility classes.

Sorry for any missing ';', I'm used to leaving them out when developing in Kotlin.
