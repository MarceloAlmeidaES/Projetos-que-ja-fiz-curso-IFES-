{ pkgs }: {
	deps = [
   pkgs.asc-key-to-qr-code-gif
		pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.replitPackages.jest
	];
}