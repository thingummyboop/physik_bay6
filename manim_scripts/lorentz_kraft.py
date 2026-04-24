from manim import *

class LorentzKraft(Scene):
    def construct(self):
        self.camera.frame_width = 22
        title = Text("Die Lorentzkraft (Rechte-Hand-Regel)").to_edge(UP)
        self.play(Write(title))

        # Magnetic field (crosses representing field into the screen)
        b_field = VGroup(*[
            VGroup(Line(UP+LEFT, DOWN+RIGHT), Line(UP+RIGHT, DOWN+LEFT)).set_color(BLUE).scale(0.1).move_to(x * RIGHT + y * UP)
            for x in range(-5, 6, 2) for y in range(-2, 3, 2)
        ])
        
        b_label = Text("B-Feld (in den Bildschirm)", color=BLUE, font_size=24).next_to(b_field, DOWN)
        self.play(FadeIn(b_field), Write(b_label))

        # Electron moving
        electron = Dot(color=YELLOW).move_to(LEFT * 5)
        e_label = Text("e-", color=BLACK, font_size=20).move_to(electron.get_center())
        e_group = VGroup(electron, e_label)

        v_arrow = Arrow(start=LEFT * 5, end=LEFT * 3, color=GREEN, buff=0)
        v_label = Text("v (Geschwindigkeit)", color=GREEN, font_size=24).next_to(v_arrow, UP)

        self.play(FadeIn(e_group), GrowArrow(v_arrow), Write(v_label))

        # Path of electron deflecting
        path = ArcBetweenPoints(start=LEFT * 5, end=RIGHT * 2 + DOWN * 3, angle=-PI/2, color=YELLOW)
        
        # Force arrow
        f_arrow = Arrow(start=ORIGIN, end=DOWN*1.5, color=RED, buff=0)
        f_label = Text("F (Lorentzkraft)", color=RED, font_size=24)
        
        alpha_tracker = ValueTracker(0)

        def update_electron(mob):
            mob.move_to(path.point_from_proportion(alpha_tracker.get_value()))
            
        e_group.add_updater(update_electron)

        def update_force_arrow(arr):
            alpha = alpha_tracker.get_value()
            current_pos = path.point_from_proportion(alpha)
            next_pos = path.point_from_proportion(min(1.0, alpha + 0.01))
            if alpha == 1.0:
                next_pos = current_pos + (current_pos - path.point_from_proportion(0.99))
            
            tangent = next_pos - current_pos
            if np.linalg.norm(tangent) > 0:
                tangent = tangent / np.linalg.norm(tangent)
            else:
                tangent = RIGHT
            
            normal = np.array([tangent[1], -tangent[0], 0]) # Rotate 90 deg right
            arr.put_start_and_end_on(current_pos, current_pos + normal * 1.5)
            f_label.next_to(arr, DOWN, buff=0.1)

        f_arrow.add_updater(update_force_arrow)
        
        self.play(FadeIn(f_arrow), FadeIn(f_label))
        
        # Moving electron along the path
        self.play(
            alpha_tracker.animate.set_value(1.0),
            v_arrow.animate.set_opacity(0),
            v_label.animate.set_opacity(0),
            run_time=4,
            rate_func=linear
        )
        
        f_arrow.clear_updaters()
        e_group.clear_updaters()
        self.wait(2)
