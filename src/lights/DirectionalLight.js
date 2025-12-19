class DirectionalLight {

    constructor(lightIntensity, lightColor, lightPos, focalPoint, lightUp, hasShadowMap, gl) {
        this.mesh = Mesh.cube(setTransform(0, 0, 0, 0.2, 0.2, 0.2, 0));
        this.mat = new EmissiveMaterial(lightIntensity, lightColor);
        this.lightPos = lightPos;
        this.focalPoint = focalPoint;
        this.lightUp = lightUp

        this.hasShadowMap = hasShadowMap;
        this.fbo = new FBO(gl);
        if (!this.fbo) {
            console.log("无法设置帧缓冲区对象");
            return;
        }
    }

    CalcLightMVP(translate, scale) {
        let lightMVP = mat4.create();
        let modelMatrix = mat4.create();
        let viewMatrix = mat4.create();
        let projectionMatrix = mat4.create();

         // Model transform
        //利用mat4接口实现的model转换
        mat4.translate(modelMatrix,modelMatrix,translate);
        mat4.scale(modelMatrix,modelMatrix,scale);

        // View transform
        //利用mat4接口实现的view转换
        mat4.lookAt(viewMatrix,this.lightPos,this.focalPoint,this.lightUp);
        
        // Projection transform
        //利用mat4接口实现的projection转换
        //注意这里用的正交矩阵
        mat4.ortho(projectionMatrix,-150,150,-150,150,0.01,500);

        mat4.multiply(lightMVP, projectionMatrix, viewMatrix);
        mat4.multiply(lightMVP, lightMVP, modelMatrix);

        return lightMVP;
    }
}
