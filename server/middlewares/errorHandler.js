function errorHandler(error, req, res, next) {
	console.log(error.name);
	if (
		error.name === "SequelizeValidationError" ||
		error.name === "SequelizeUniqueConstraintError"
	) {
		const errors = error.errors.map((error) => {
			return error.message;
		});
		res.status(400).json({ message: errors });
	}
	if (error.name === "Invalid input") {
		res.status(400).json({ message: "Please check your input" });
	} else if (error.name === "Invalid Id") {
		res.status(400).json({ message: "Invalid id" });
	} else if (error.name === "invalid email/password") {
		res.status(401).json({ message: "Invalid email/password" });
	} else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
		res.status(401).json({ message: "Invalid token" });
	} else if (error.name === "Forbidden") {
		res.status(403).json({ message: "Forbidden" });
	} else if (error.name === "NotFound") {
		res.status(404).json({ message: "Data not found" });
	} else if (error.name === "TransactionsNotFound") {
		res.status(404).json({ message: "Transaction cannot be found" });
	} else if (error.name === "WalletNotFound") {
		res.status(404).json({ message: "Wallet cannot be found" });
	} else if (error.name === "SequelizeForeignKeyConstraintError") {
		res.status(404).json({ message: "Category or Wallet not found" });
	}  else if (error.name === "File needs to be an image") {
		res.status(400).json({ message: "File needs to be an image" });
	} else if (error.name === "Alreadyinthiswallet") {
		res.status(400).json({ message: "This user is registered in this wallet" });
	} else if (error.name === "Cantdeleteowner") {
		res.status(400).json({ message: "Can't delete owner" });
	} else if (error.name === "EmailNotFound") {
		res.status(404).json({ message: `The user with this email is not registered yet` });
	} else {
		res.status(500).json({ message: "Internal server error" });
	}
}

module.exports = errorHandler;
