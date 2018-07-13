import React, { Component } from 'react';
import './CategoryItem.css';

class CategoryItem extends Component {
  render() {
    let categoryNode;

    if (this.props.flagChangeText) {
        categoryNode = <form 
            className="category-item__form" 
            onSubmit={this.props.submitCategoryInput.bind(this)}
            >
            <input 
                type="text" 
                className="category-item__form_input" 
                value={this.props.text}
                data-index={this.props.index}
                onChange={this.props.changeInputCategoryItem.bind(this)}
                />
        </form>;
    } else {
        // For correcting the click processing we create different id
        let idLabel = "category-item__checkbox--label-" + this.props.index;

        categoryNode = <span>
            <input 
                type="checkbox"
                id={idLabel}
                className="category-item__checkbox"
                checked={this.props.checkedInput}
                onChange={this.props.toggleShowTasks.bind(null, this.props.index)}
            />
            <label htmlFor={idLabel} className="category-item__text">
                {this.props.text}
            </label>
        </span>;
    }

    return (
    	<div className="category-item">
    		<div className="category-item__left">
                {categoryNode}
    			<input className="category-item__editing" type="image" onClick={this.props.changeCategoryText.bind(null, this.props.index)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIJSURBVGhD7Zm/S1ZRGMdvZEGKthUkKP4YhMKhmm1tE5xEhwjDH39D0FLQlIMYNRWI/QFJ4uAuuOuibuHQ4pCKUlp9vvfeQ+c93HdzeB44H/hwzz28w/2+5zznPfe8RSaTyWSuiBF8j1/xFXajK57hSzzDTXyHe3iAA+iCGfyDf3FZHTVduI8fyjvjKMQlzuInPMKHGFjEtapplxBCV3EdQ5hH6gBNs49V0yZhOs2Xd/+JwyzhOT5Ak4SR+ImaNjcxJoRRzWgBMEk8nTR99M03hVHNaMS0mpkjDqGCnsamMPHnzJE+XAgi4jAL6CLEKL7FFIVRzWg6mQ8h7uB41Wwh/Zwp4ofrxw1swk0IcQPHqmYLbkJ04vf6muImxC11wHB9jXETQhziYNVswU2IPlRNhBGJcRNCaHVyXdjapd7FJtyEEPrFdv1j97i2CTchxGRtipsQ8Q42xU0I0S6ImxDttuLCdIgXGD+cy614HMLtVnwK9ca2Wt453YpfQ5277uIvfI1NmA4hnuAF9qKOZI4xfacwH0Ks4LeqWQyhDstO8I06wEWIHjzFifKuKDpQL0fP8Td+QfMhxBz+wPT07x6qZswe2aRso/5weYpaqTQy66ia0QLQbltiCr1TqB6kwmhkNM0+o5ZerWYu0B8rIcgW6jD5NrpCNbGDCnNfHV5RENVEJpPJWKIo/gHiTqd1jOo86QAAAABJRU5ErkJggg==" />
    		</div>
    		<div className="category-item__right">
    			<input className="category-item__delete" type="image" onClick={this.props.deleteCategoryItem.bind(null, this.props.index)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATESURBVGhD7ZlrqBVVGIZXV5MuphRoRVRi4SWLrCiKoItFCYahFOIFQSPT0CIwqKzoRlBQUURIlz9FpSAJ1Q8JygKlwjBQJMrCICi7Et2jep/vcx1m9qyZs7d77XP2j/PAw/m+WWdm9tp71nXCCINzprxFrkm4Sp4n+56l8h/53yBSqb5lovxNbpVT5GkJJ8mN8i95tuw7DpJvyz/kZA40cLz8Tn4sD+NAP7FE8sistWxwFslO/r8rTpXPyc1t+JPkg71bODaYtKU/W47V+ZI8S3bMofIzybO8XX40zNL2vpdjZUecLvmG6S77gWsln2emZR3AWMCJ8y0LYYx8eP9fOEGSH26Z90b3emicI2/zcADa0RUeGnxJ53to3Cnp7eAQ+YA82bIQLpZ8nlmWdUBrRa6W5PwFjpNPs8zHBfKTLAvhKfmvhwN8KTd5aNCunvYwHCM5/0HLQpgqyW+yLGNFrpTk/IUbJHn8Bm+X5OMtC+Fx+beHA3wuGUMiP8gnPQxHSSp+n2UhnCG53jLLMlbkCHnj/r9wrCQ/2LIQTpSLPTQYHK/3cAB+zeIgeJ3kA0cWyviLMi4xSzjOsi4qwijMiXdbNvzEcedSyzqAb/pDyck/Sh6D4ZTHjjZ2pOwYHh96kq8lffizwyAf/hd5v+Tx7YoN8isPh5z3JE9GFp6Q9ECxYQ8l9HSve9g9cYyYYNnQwmz6GQ+7Z4GkIudaVoVfaraMXXMRRmi6ZcaJFIxLdQ2Y6T73vcuyDFwmuSDznRRxXkZlWmEKQtlcy8oweFI2z7IqzHYpZ2qThfhBb7asCvMhyunrW4kDWRxYizC9oWyOZVWukZTH2UTX8FhwQSZxKeimKV9hWZmmilwgKaub0TKyUx7nc1n4WT7vYQXWLtzwDsvKNFWEClB2oWVV7pGUj7MsE7skK7U6WPg85GGJporwSFFW942vk1w3K1Rip4dJvpVxJlukqSJMEimLa45W3pCfepiPFyXrhzr2yBc8LNFUEToPyuqWr+yyvONhPnhsuGldn79DrvewRFNFaFOU1W0J8Su/7GE+VkpuSlecgjnRWx6WaKoIq8HfPawwSnLeo5ZlJDZMBscUb8r3PSzRVBHmcPs8rMBWFOettiwjbDxzYaYrKV6Vn3hYoqkidOe0rRTxvLpR/4BhLcCF6zaf2cj7wsMSTRV5TaYqDyyTOe8iyzLCoMfOII9DCo6zn9tKU0VoU7StFLdKzuMRyw4rRRZZKZi+MOVupakidR0EPCY5j0afnQ/kNg8r1HWlTRXhseLxSvGK/MbD/LAntdfDCsslH7h1cGuqCA29bv62RTIg9gR2BdnUTi15WTtQzn5UkaMlHUFqGsJW01UeVmADnSlKT2BHhW837ib2Etobk8aeEF/m1C15c8HuIvcpbopnhZ10bpBa0uZkuuQ+LKx6AhvW3ICGHWEtwR5wO7IhfYoEXkMUy1gtRuLOP0vdnhCXtLwXiTDH4li7xq0dZrXF4yzcIrxK4NgBvWprF/r+3TIOVKznZ7QpL3/ieaNlsYytH6DXYxHHFi1bST0j7orz0pMtHtpNLml7rGm4/pC8BeClzq8yPhY5ZWv2EdnTX6MI7xIvkUyzc3m5jC92RhhhhCyE8D/nd6KN+0AUXgAAAABJRU5ErkJggg=="/>
    			<input className="category-item__add" type="image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAENSURBVGhD7dk9agJhFIXhiWA6S7MBwRVkA2lS+bOOYJvKVCnsQwiCpbijQCzMAoKNCAlEmyTvxWYIF5wRdO4n54UHLIaPOTAgo5lSqvIauNh9TLMbzPGLNYZIblALX7AReQMk1QP+jzCvSKoxvCH2iCWVhkRLQ6KlIdHSkGhpSLQ05Bi1McLkAG/whmzhXb/PMzoo3S2+4d1MlWxQqd7hHRTBNQrVhHdAFHcoVB2f8A6JoI/CPcI7pGr2qnyJwtVwjwVWB9jAu5EfeNfv84Ep7LE/afpCjJaGREtDoqUh0dKQaGlItM5myBO8IUskVRfekBmS6wX5EfZSdIUksx8K7J/cHkq92SmllFOW/QFe+8Vw40NiEwAAAABJRU5ErkJggg==" />
    		</div>
    	</div>
    );
  }
}

export default CategoryItem;